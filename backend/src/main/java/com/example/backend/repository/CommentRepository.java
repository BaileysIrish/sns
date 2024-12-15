package com.example.backend.repository;

import com.example.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBoard_BoardNumber(int boardNumber);

    List<Comment> findByParentComment_Id(int parentCommentId);
}
