package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.model.CommentLike;
import com.example.backend.model.User;
import com.example.backend.repository.CommentLikeRepository;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentLikeService(CommentLikeRepository commentLikeRepository,
                              CommentRepository commentRepository,
                              UserRepository userRepository) {
        this.commentLikeRepository = commentLikeRepository;
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    public boolean toggleCommentLike(String email, int commentId) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found."));

        // 단일 좋아요 항목 처리
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserAndComment(user, comment);

        if (existingLike.isPresent()) {
            // 기존 좋아요 삭제
            commentLikeRepository.delete(existingLike.get());
            return false; // 좋아요 취소
        } else {
            // 새로운 좋아요 추가
            CommentLike like = new CommentLike();
            like.setUser(user);
            like.setComment(comment);
            commentLikeRepository.save(like);
            return true; // 좋아요 추가
        }
    }


    public int getCommentLikeCount(int commentId) {
        return commentLikeRepository.countByCommentId(commentId);
    }

    public boolean isCommentLikedByUser(int commentId, String email) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found."));
        return commentLikeRepository.findByUserAndComment(user, comment).isPresent();
    }
}
