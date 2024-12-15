package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoryFileDto {
    private Long id;
    private String filePath;
    private String fileType;
}
