package com.example.backend.service;

import com.example.backend.dto.BoardFileDto;
import com.example.backend.model.Board;
import com.example.backend.model.BoardFile;
import com.example.backend.repository.BoardRepository;
import com.example.backend.repository.BoardFileRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;

    public BoardService(BoardRepository boardRepository, BoardFileRepository boardFileRepository) {
        this.boardRepository = boardRepository;
        this.boardFileRepository = boardFileRepository;
    }

    // 게시물 생성
    public Board createPost(Board board) {
        board.setWriteDatetime(LocalDateTime.now());
        return boardRepository.save(board);
    }

    // 파일 저장
    public void saveFile(BoardFile boardFile) {
        boardFileRepository.save(boardFile);
    }

    // 모든 게시물 가져오기
    public List<Board> getAllPosts() {
        return boardRepository.findAll();
    }

    // 게시물 ID로 가져오기
    public Board getPostById(int boardNumber) {
        return boardRepository.findById(boardNumber).orElse(null);
    }

    // 게시물 업데이트
    public Board updatePost(Board board) {
        // 업데이트 시 기존 게시물 유효성 검증
        Board existingBoard = boardRepository.findById(board.getBoardNumber()).orElseThrow(() ->
                new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));
        existingBoard.setContent(board.getContent());
        return boardRepository.save(existingBoard);
    }

    // 게시물 삭제
    public void deletePost(int boardNumber) {
        boardRepository.deleteById(boardNumber);
    }

    // 작성자 확인
    public boolean isAuthor(int boardNumber, String userEmail) {
        Board board = boardRepository.findById(boardNumber).orElseThrow(() ->
                new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));
        return board.getEmail().equals(userEmail);
    }

    // 좋아요 토글
    public boolean toggleFavorite(int boardNumber, String email) {
        Board board = boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalArgumentException("게시물이 존재하지 않습니다."));

        boolean isLiked = board.getFavoriteUsers().contains(email);

        if (isLiked) {
            // 좋아요 취소
            board.setFavoriteCount(board.getFavoriteCount() - 1);
            board.getFavoriteUsers().remove(email);
        } else {
            // 좋아요 추가
            board.setFavoriteCount(board.getFavoriteCount() + 1);
            board.getFavoriteUsers().add(email);
        }

        boardRepository.save(board); // 변경 사항 저장
        return !isLiked; // 새로운 상태 반환
    }

    // 좋아요 개수 가져오기
    public int getFavoriteCount(int boardNumber) {
        System.out.println("getFavoriteCount 호출 - boardNumber: " + boardNumber);
        Board board = boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalArgumentException("게시물이 존재하지 않습니다."));
        return board.getFavoriteCount();
    }

    // 특정 사용자의 좋아요 상태 확인
    public boolean isPostLikedByUser(int boardNumber, String email) {
        System.out.println("isPostLikedByUser 호출 - boardNumber: " + boardNumber + ", email: " + email);
        Board board = boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalArgumentException("게시물이 존재하지 않습니다."));
        return board.getFavoriteUsers().contains(email);
    }

    // 파일 삭제
    public void deleteFilesByBoardNumber(int boardNumber) {
        List<BoardFile> files = boardFileRepository.findByBoard_BoardNumber(boardNumber);
        for (BoardFile file : files) {
            File fileOnDisk = new File(file.getFilePath());
            if (fileOnDisk.exists()) {
                fileOnDisk.delete(); // 디스크에서 파일 삭제
            }
            boardFileRepository.delete(file); // DB에서 파일 삭제
        }
    }

    public List<BoardFileDto> getUserStoriesByEmail(String email) {
        List<Board> userBoards = boardRepository.findByEmail(email);
        List<BoardFileDto> boardFileDtos = new ArrayList<>();

        for (Board board : userBoards) {
            for (BoardFile file : board.getFiles()) {
                BoardFileDto dto = new BoardFileDto();
                dto.setFilePath(file.getFilePath());
                dto.setFileUrl(file.getFileUrl());
                dto.setFileType(file.getFileType());
                boardFileDtos.add(dto);
            }
        }

        return boardFileDtos;
    }

    public List<Board> getPostsByEmail(String email) {
        return boardRepository.findByEmail(email);
    }



}
