package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter

public class CommentDTO {
    private int id;
    private String content;
    private String authorEmail;
    private LocalDateTime createdAt;

    public CommentDTO(int id, String content, String authorEmail, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorEmail = authorEmail;
        this.createdAt = createdAt;
    }
}