package com.example.backend.service;

import com.example.backend.dto.StoryDto;
import com.example.backend.dto.StoryFileDto;
import com.example.backend.model.Story;
import com.example.backend.model.StoryFile;
import com.example.backend.repository.StoryRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StoryService {

    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    public StoryService(StoryRepository storyRepository, UserRepository userRepository) {
        this.storyRepository = storyRepository;
        this.userRepository = userRepository;
    }

    public StoryDto createStory(Story story) {
        Story savedStory = storyRepository.save(story);
        return convertToDto(savedStory);
    }

    public List<StoryDto> getUserStories(String userEmail) {
        return storyRepository.findByUserEmail(userEmail)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void deleteStory(Long storyId) {
        storyRepository.deleteById(storyId);
    }

    private StoryDto convertToDto(Story story) {
        StoryDto dto = new StoryDto();
        dto.setId(story.getId());
        dto.setUserEmail(story.getUser().getEmail());
        dto.setCreatedAt(story.getCreatedAt());
        dto.setFiles(story.getFiles()
                .stream()
                .map(this::convertToFileDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private StoryFileDto convertToFileDto(StoryFile storyFile) {
        StoryFileDto dto = new StoryFileDto();
        dto.setId(storyFile.getId());
        dto.setFilePath(storyFile.getFilePath());
        dto.setFileType(storyFile.getFileType());
        return dto;
    }
}
