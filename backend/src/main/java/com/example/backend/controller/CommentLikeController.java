package com.example.backend.controller;

import com.example.backend.service.CommentLikeService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/comment-likes")
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    public CommentLikeController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    @PostMapping("/{commentId}")
    public ResponseEntity<Map<String, Object>> toggleCommentLike(
            @RequestParam String email,
            @PathVariable int commentId) {
        boolean isLiked = commentLikeService.toggleCommentLike(email, commentId);
        int likeCount = commentLikeService.getCommentLikeCount(commentId);

        // Map 객체로 JSON 형태 응답 생성
        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);
        response.put("likeCount", likeCount);

        // JSON 응답 반환
        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }


    @GetMapping("/{commentId}")
    public ResponseEntity<?> getCommentLikeCount(@PathVariable int commentId) {
        try {
            int likeCount = commentLikeService.getCommentLikeCount(commentId);
            return ResponseEntity.ok(likeCount);
        } catch (Exception e) {
            e.printStackTrace(); // 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to fetch like count: " + e.getMessage()));
        }
    }

    // 좋아요 상태 확인 API
    @GetMapping("/status/{commentId}")
    public ResponseEntity<Boolean> getCommentLikeStatus(
            @PathVariable int commentId,
            @RequestParam String email) {
        try {
            boolean isLiked = commentLikeService.isCommentLikedByUser(commentId, email);
            return ResponseEntity.ok(isLiked);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
