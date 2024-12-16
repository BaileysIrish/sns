package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ScheduleDTO {
    private Long id;

    private String title;

    private String description;

    private String userEmail;

    private LocalDateTime createdAt; // 입력 날짜

    private LocalDateTime updatedAt; // 수정 날짜
}
