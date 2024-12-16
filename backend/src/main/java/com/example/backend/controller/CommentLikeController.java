package com.example.backend.controller;

import com.example.backend.service.CommentLikeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment-likes")
public class CommentLikeController {

    private final CommentLikeService commentLikeService;

    public CommentLikeController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    @PostMapping("/{commentId}")
    public int toggleCommentLike(@RequestParam String email, @PathVariable int commentId) {
        return commentLikeService.toggleCommentLike(email, commentId);
    }

    @GetMapping("/{commentId}")
    public int getCommentLikeCount(@PathVariable int commentId) {
        return commentLikeService.getCommentLikeCount(commentId);
    }
}
