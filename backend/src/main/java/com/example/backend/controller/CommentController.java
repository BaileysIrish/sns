package com.example.backend.controller;

import com.example.backend.dto.CommentDTO;
import com.example.backend.model.Comment;
import com.example.backend.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 기존의 댓글 생성
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        Comment createdComment = commentService.createComment(comment);
        return ResponseEntity.ok(createdComment);
    }

    // 특정 게시글의 댓글 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByBoardId(@PathVariable int boardId) {
        List<CommentDTO> comments = commentService.getCommentsByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    // 새로운: 매개변수가 없는 경우 처리 (GET /api/comments)
    @GetMapping
    public ResponseEntity<String> handleInvalidGetRequest() {
        return ResponseEntity.badRequest().body("boardId is required for this request.");
    }


    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(
            @PathVariable int commentId,
            @RequestBody CommentDTO commentDTO) {

        Comment updatedComment = commentService.updateComment(commentId, commentDTO.getContent());
        return ResponseEntity.ok(new CommentDTO(
                updatedComment.getId(),
                updatedComment.getContent(),
                updatedComment.getAuthorEmail(),
                updatedComment.getCreatedAt()
        ));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
