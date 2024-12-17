package com.example.backend.service;

import com.example.backend.model.SavedPost;
import com.example.backend.repository.SavedPostRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedPostService {
    @Autowired
    private SavedPostRepository savedPostRepository;

    public SavedPost savePost(SavedPost post) {
        return savedPostRepository.save(post);
    }

    public List<SavedPost> getSavedPostsByUser(String authorId) {
        return savedPostRepository.findByAuthorId(authorId);
    }
    public boolean isPostSaved(String userId, String content) {
        return savedPostRepository.existsByUserIdAndContent(userId, content);
    }

    // 트랜잭션 관리 추가
    @Transactional
    public void deleteSavedPost(String userId, String content) {
        savedPostRepository.deleteByUserIdAndContent(userId, content);
    }
}
