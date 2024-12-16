package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private int id;
    private String content;
    private String authorEmail;
    private LocalDateTime createdAt;
    private List<CommentDTO> replies; // 대댓글 리스트 추가

    public CommentDTO(int id, String content, String authorEmail, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorEmail = authorEmail;
        this.createdAt = createdAt;
    }
}