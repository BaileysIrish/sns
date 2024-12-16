package com.example.backend.controller;

import com.example.backend.dto.StoryDto;
import com.example.backend.model.Story;
import com.example.backend.model.StoryFile;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.StoryService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    private final StoryService storyService;
    private final UserRepository userRepository;

    @Value("${file.upload-dir.story-image}")
    private String uploadDir;

    public StoryController(StoryService storyService, UserRepository userRepository) {
        this.storyService = storyService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<StoryDto> createStory(
            @RequestParam("userEmail") String userEmail,
            @RequestParam("files") List<MultipartFile> files) throws IOException {

        // 사용자 조회
        User user = userRepository.findByEmail(userEmail);

        // 스토리 생성
        Story story = new Story();
        story.setUser(user);
        story.setCreatedAt(LocalDateTime.now());

        List<StoryFile> storyFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            // 파일명 생성 및 저장 경로 설정
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            File dest = new File(uploadDir, fileName);

            // 디렉토리 존재 여부 확인 후 생성
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }

            // 파일 저장
            file.transferTo(dest);

            // URL 설정
            String fileUrl = "http://localhost:8080/api/stories/story-files/" + fileName;

            // StoryFile 객체 생성
            StoryFile storyFile = new StoryFile();
            storyFile.setStory(story);
            storyFile.setFilePath(fileUrl);
            storyFile.setFileType(file.getContentType());

            storyFiles.add(storyFile);
        }

        story.setFiles(storyFiles);
        return ResponseEntity.ok(storyService.createStory(story));
    }

    @GetMapping("/story-files/{fileName}")
    public ResponseEntity<Resource> getStoryFile(@PathVariable String fileName) {
        String filePath = uploadDir + "/" + fileName;
        Resource file = new FileSystemResource(filePath);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<StoryDto>> getUserStories(@PathVariable String userEmail) {
        return ResponseEntity.ok(storyService.getUserStories(userEmail));
    }

    @DeleteMapping("/{storyId}")
    public ResponseEntity<Void> deleteStory(@PathVariable Long storyId) {
        storyService.deleteStory(storyId);
        return ResponseEntity.noContent().build();
    }
}
