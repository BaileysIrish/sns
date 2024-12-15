package com.example.backend.repository;

import com.example.backend.model.StoryFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryFileRepository extends JpaRepository<StoryFile, Long> {
    List<StoryFile> findByStoryId(Long storyId);
}
