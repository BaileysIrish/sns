package com.example.backend.dto;

import com.example.backend.model.Comment;

import java.time.LocalDateTime;

public class CommentDTO {
    private int id;
    private String content;
    private String authorEmail;
    private LocalDateTime createdAt;

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.authorEmail = comment.getAuthorEmail();
        this.createdAt = comment.getCreatedAt();
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getAuthorEmail() {
        return authorEmail;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
