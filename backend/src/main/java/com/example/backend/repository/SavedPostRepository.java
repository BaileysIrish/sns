package com.example.backend.repository;

import com.example.backend.model.SavedPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedPostRepository extends JpaRepository<SavedPost, Long> {

    boolean existsByUserIdAndContent(String userId, String content);

    void deleteByUserIdAndContent(String userId, String content);
    List<SavedPost> findByAuthorId(String authorId);
}
