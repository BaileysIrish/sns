package com.example.backend.controller;

import com.example.backend.model.Board;
import com.example.backend.service.BoardService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @Value("${file.upload-dir.content-image}")
    private String contentImageDir; // content_image 파일 저장 경로

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/create")
    public ResponseEntity<Board> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("email") String email,
            @RequestParam(value = "content_image", required = false) MultipartFile contentImage) {

        String contentImagePath = null;

        // content_image 파일 저장
        if (contentImage != null && !contentImage.isEmpty()) {
            try {
                String fileName = System.currentTimeMillis() + "_" + contentImage.getOriginalFilename();
                File file = new File(contentImageDir + File.separator + fileName);
                contentImage.transferTo(file);

                // 파일 접근 경로 설정
                contentImagePath = ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/content-files/")
                        .path(fileName)
                        .toUriString();
            } catch (IOException e) {
                return ResponseEntity.status(500).body(null);
            }
        }

        // 게시물 데이터 설정
        Board board = new Board();
        board.setTitle(title);
        board.setContent(content);
        board.setEmail(email);
        board.setWriteDatetime(LocalDateTime.now());
        board.setContentImage(contentImagePath);

        // 게시물 저장 및 응답
        return ResponseEntity.ok(boardService.createPost(board));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Board>> getAllPosts() {
        return ResponseEntity.ok(boardService.getAllPosts());
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Board> getPostById(@PathVariable int id) {
        return ResponseEntity.ok(boardService.getPostById(id));
    }

    @PutMapping("/update")
    public ResponseEntity<Board> updatePost(@RequestBody Board board) {
        return ResponseEntity.ok(boardService.updatePost(board));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable int id) {
        boardService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}
