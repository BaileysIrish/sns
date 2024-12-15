package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

public class CommentDTO {
    private int id; // 댓글 ID
    private String content; // 댓글 내용
    private String authorEmail; // 작성자 이메일
    private LocalDateTime createdAt; // 작성 시간
    private int boardId; // 게시물 ID
    private Integer parentCommentId; // 부모 댓글 ID (대댓글인 경우)
    private List<CommentDTO> replies; // 대댓글 리스트

    // 기본 생성자
    public CommentDTO() {
        this.replies = new ArrayList<>();
    }

    // 최상위 댓글 생성자
    public CommentDTO(int id, String content, String authorEmail, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorEmail = authorEmail;
        this.createdAt = createdAt;
        this.replies = new ArrayList<>();
    }

    // 게시물 ID 포함 생성자
    public CommentDTO(int id, String content, String authorEmail, LocalDateTime createdAt, Integer boardId) {
        this.id = id;
        this.content = content;
        this.authorEmail = authorEmail;
        this.createdAt = createdAt;
        this.boardId = boardId;
        this.replies = new ArrayList<>();
    }

    // 대댓글 포함 생성자
    public CommentDTO(int id, String content, String authorEmail, LocalDateTime createdAt, Integer boardId, Integer parentCommentId) {
        this.id = id;
        this.content = content;
        this.authorEmail = authorEmail;
        this.createdAt = createdAt;
        this.boardId = boardId;
        this.parentCommentId = parentCommentId;
        this.replies = new ArrayList<>();
    }

}
