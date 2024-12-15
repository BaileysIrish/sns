package com.example.backend.service;

import com.example.backend.dto.CommentDTO;
import com.example.backend.model.Comment;
import com.example.backend.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        comment.setCreatedAt(java.time.LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public List<CommentDTO> getCommentsByBoardId(int boardId) {
        List<Comment> allComments = commentRepository.findByBoard_BoardNumber(boardId);

        // 최상위 댓글만 필터링하여 계층 구조로 변환
        return allComments.stream()
                .filter(comment -> comment.getParentComment() == null) // 부모 댓글이 없는 최상위 댓글만
                .map(this::convertToDTOWithReplies) // 대댓글 포함 DTO 변환
                .collect(Collectors.toList());
    }

    // 댓글을 재귀적으로 DTO로 변환
    private CommentDTO convertToDTOWithReplies(Comment comment) {
        CommentDTO dto = new CommentDTO(
                comment.getId(),
                comment.getContent(),
                comment.getAuthorEmail(),
                comment.getCreatedAt(),
                comment.getBoard().getBoardNumber(),
                comment.getParentComment() != null ? comment.getParentComment().getId() : null
        );

        if (comment.getReplies() != null && !comment.getReplies().isEmpty()) {
            dto.setReplies(comment.getReplies().stream()
                    .map(this::convertToDTOWithReplies)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public List<CommentDTO> getAllComments() {
        return commentRepository.findAll()
                .stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getContent(),
                        comment.getAuthorEmail(),
                        comment.getCreatedAt(),
                        comment.getBoard().getBoardNumber()
                ))
                .collect(Collectors.toList());
    }

    public Comment findCommentById(int commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
    }

    public Comment updateComment(int commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        comment.setContent(newContent);
        return commentRepository.save(comment);
    }

    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }
}