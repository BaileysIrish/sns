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
        return commentRepository.findByBoard_BoardNumber(boardId)
                .stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getContent(),
                        comment.getAuthorEmail(),
                        comment.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    // CommentService.java
    public Comment updateComment(int commentId, String newContent) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        comment.setContent(newContent); // 새로운 내용으로 업데이트
        return commentRepository.save(comment); // 저장 후 업데이트된 댓글 반환
    }


    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }
}
