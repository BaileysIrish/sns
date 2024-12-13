package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByBoardId(int boardId) {
        return commentRepository.findByBoard_BoardNumber(boardId);
    }

    public void deleteComment(int commentId) {
        commentRepository.deleteById(commentId);
    }
}
