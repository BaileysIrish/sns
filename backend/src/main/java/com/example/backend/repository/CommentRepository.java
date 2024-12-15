package com.example.backend.repository;

import com.example.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBoard_BoardNumber(int boardNumber); // 게시물의 모든 댓글 조회

    List<Comment> findByParentComment_Id(int parentCommentId); // 특정 댓글의 대댓글 조회
}
