package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardFileDto {
    private String filePath;  // 파일 경로
    private String fileType;  // 파일 타입
    private String fileUrl;   // 파일 URL 추가
}
