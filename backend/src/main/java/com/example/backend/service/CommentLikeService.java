package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.model.CommentLike;
import com.example.backend.model.User;
import com.example.backend.repository.CommentLikeRepository;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

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

    public int toggleCommentLike(String email, int commentId) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found."));
        Optional<CommentLike> existingLike = commentLikeRepository.findByUserAndComment(user, comment);

        if (existingLike.isPresent()) {
            commentLikeRepository.delete(existingLike.get());
        } else {
            CommentLike like = new CommentLike();
            like.setUser(user);
            like.setComment(comment);
            commentLikeRepository.save(like);
        }

        return commentLikeRepository.countByComment(comment);
    }

    public int getCommentLikeCount(int commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found."));
        return commentLikeRepository.countByComment(comment);
    }
}
