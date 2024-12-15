package com.example.backend.controller;

import com.example.backend.dto.CommentDTO;
import com.example.backend.model.Board;
import com.example.backend.model.Comment;
import com.example.backend.service.BoardService;
import com.example.backend.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final BoardService boardService;

    public CommentController(CommentService commentService, BoardService boardService) {
        this.commentService = commentService;
        this.boardService = boardService;
    }

    // 댓글 생성
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CommentDTO commentDTO) {
        // 게시물 확인
        Board board = boardService.getPostById(commentDTO.getBoardId());
        if (board == null) {
            return ResponseEntity.notFound().build();
        }

        // 부모 댓글 확인 (대댓글 처리)
        Comment parentComment = null;
        if (commentDTO.getParentCommentId() != null) {
            parentComment = commentService.findCommentById(commentDTO.getParentCommentId());
            if (parentComment == null) {
                return ResponseEntity.badRequest().build();
            }
        } else {
            parentComment = null; // 일반 댓글
        }

        // @username 제거 (옵션)
        String sanitizedContent = commentDTO.getContent().replaceAll("@\\w+", "").trim();

        // 댓글 생성
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());
        comment.setAuthorEmail(commentDTO.getAuthorEmail());
        comment.setBoard(board);
        comment.setParentComment(parentComment); // 대댓글 설정

        Comment createdComment = commentService.createComment(comment);

        return ResponseEntity.ok(new CommentDTO(
                createdComment.getId(),
                createdComment.getContent(),
                createdComment.getAuthorEmail(),
                createdComment.getCreatedAt(),
                createdComment.getBoard().getBoardNumber(),
                createdComment.getParentComment() != null ? createdComment.getParentComment().getId() : null
        ));
    }

    @GetMapping("/{boardId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByBoardId(@PathVariable int boardId) {
        List<CommentDTO> comments = commentService.getCommentsByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getAllComments() {
        List<CommentDTO> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
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
                updatedComment.getCreatedAt(),
                updatedComment.getBoard().getBoardNumber(), // 게시물 ID 추가
                updatedComment.getParentComment() != null ? updatedComment.getParentComment().getId() : null // 부모 댓글 ID 추가
        ));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}