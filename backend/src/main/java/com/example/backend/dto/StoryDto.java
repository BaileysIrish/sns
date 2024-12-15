package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class StoryDto {
    private Long id;
    private String userEmail;
    private LocalDateTime createdAt;
    private List<StoryFileDto> files;
}
