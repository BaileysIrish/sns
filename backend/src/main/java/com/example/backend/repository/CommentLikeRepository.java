package com.example.backend.repository;

import com.example.backend.model.Comment;
import com.example.backend.model.CommentLike;
import com.example.backend.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Integer> {
    Optional<CommentLike> findByUserAndComment(User user, Comment comment);


    @Query("SELECT COUNT(cl) FROM CommentLike cl WHERE cl.comment.id = :commentId")
    int countByCommentId(@Param("commentId") int commentId);

    @Transactional
    void deleteByCommentAndUser(Comment comment, User user);
    boolean existsByUserAndComment(User user, Comment comment);
}
