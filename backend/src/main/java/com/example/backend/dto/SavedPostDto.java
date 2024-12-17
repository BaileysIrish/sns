package com.example.backend.dto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class SavedPostDto {
    private Long id;
    private int boardNumber; // boardNumber 추가
    private String authorId;
    private String content;
    private String filePath;
    private String fileType; // 파일 타입 필드 추가 (필요한 경우)
    private LocalDateTime createdAt; // 작성 시간

}
