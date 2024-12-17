package com.example.backend.controller;
import com.example.backend.dto.BoardDto;
import com.example.backend.dto.BoardFileDto;
import com.example.backend.dto.SavedPostDto;
import com.example.backend.model.SavedPost;
import com.example.backend.service.SavedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saved-posts")
public class SavedPostController {
    @Autowired
    private SavedPostService savedPostService;

    @PostMapping("/save")
    public ResponseEntity<SavedPost> savePost(@RequestBody SavedPost post) {
        // boardNumber가 없을 경우 에러 처리
        if (post.getBoardNumber() == 0) {
            return ResponseEntity.badRequest().body(null);  // 400 Bad Request
        }

        try {
            // 파일이 없을 경우에도 정상 처리
            if (post.getFilePath() == null) {
                post.setFilePath(null);  // filePath가 없다면 null로 처리
                post.setFileType(null);  // fileType도 null로 처리
            }

            // 게시물을 저장하고 저장된 객체 반환
            SavedPost savedPost = savedPostService.savePost(post);
            return ResponseEntity.ok(savedPost);  // 저장된 게시물 데이터 반환
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);  // 500 서버 오류
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BoardDto>> getSavedPosts(@PathVariable String userId) {
        List<SavedPost> savedPosts = savedPostService.getSavedPostsByUser(userId);

        List<BoardDto> boardDtos = savedPosts.stream().map(savedPost -> {
            BoardDto boardDto = new BoardDto();
            boardDto.setBoardNumber(savedPost.getBoardNumber()); // boardNumber 반환
            boardDto.setEmail(savedPost.getAuthorId());
            boardDto.setContent(savedPost.getContent());
            boardDto.setWriteDatetime(savedPost.getCreatedAt());

            // 파일 정보 설정
            if (savedPost.getFilePath() != null) {
                BoardFileDto fileDto = new BoardFileDto();
                fileDto.setFileUrl(savedPost.getFilePath());
                fileDto.setFileType(savedPost.getFileType());
                boardDto.setFiles(List.of(fileDto));
            } else {
                boardDto.setFiles(List.of()); // 파일이 없으면 빈 리스트 반환
            }

            return boardDto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(boardDtos);
    }






    // 파일 경로에서 파일 타입 추출하는 유틸리티 메서드
    private String getFileTypeFromPath(String filePath) {
        if (filePath.endsWith(".png")) return "image/png";
        if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
        if (filePath.endsWith(".gif")) return "image/gif";
        return "application/octet-stream"; // 기본 파일 타입
    }


    @GetMapping("/is-saved")
    public boolean isPostSaved(@RequestParam String userId, @RequestParam String content) {
        return savedPostService.isPostSaved(userId, content);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteSavedPost(@RequestParam String userId, @RequestParam String content) {
        try {
            savedPostService.deleteSavedPost(userId, content);  // 서비스에서 삭제 호출
            return ResponseEntity.ok("저장된 게시물이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("게시물 삭제 중 오류가 발생했습니다.");
        }
    }
}
