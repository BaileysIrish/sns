package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardDto {
    private int boardNumber; // 게시물 번호
    private String title; // 게시물 제목
    private String content; // 게시물 내용
    private String email; // 작성자 이메일 추가
    private List<BoardFileDto> files; // 파일 리스트
}