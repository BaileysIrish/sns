package com.example.backend.repository;

import com.example.backend.model.Comment;
import com.example.backend.model.CommentLike;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    Optional<CommentLike> findByUserAndComment(User user, Comment comment);
    int countByComment(Comment comment);
}
