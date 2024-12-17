package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "saved_post") // 테이블 이름을 명시적으로 지정
public class SavedPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int boardNumber; // 실제 게시물의 고유 번호

    private String userId; // 저장한 유저의 ID
    private String authorId; // 게시물을 작성한 유저의 ID
    private String content; // 게시물 내용
    private String filePath; // 파일 경로
    private String fileType; // 파일 타입 (새로 추가된 필드)

    private LocalDateTime createdAt = LocalDateTime.now();



}
