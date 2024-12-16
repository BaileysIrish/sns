package com.example.backend.repository;

import com.example.backend.model.BoardFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {
    // 게시물 번호로 파일 리스트 조회
    List<BoardFile> findByBoard_BoardNumber(int boardNumber);
}
