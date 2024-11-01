package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.repository.BoardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board createPost(Board board) {
        board.setWriteDatetime(LocalDateTime.now());
        return boardRepository.save(board);
    }

    public List<Board> getAllPosts() {
        return boardRepository.findAll();
    }

    public Board getPostById(int boardNumber) {
        return boardRepository.findById(boardNumber).orElse(null);
    }

    public Board updatePost(Board board) {
        return boardRepository.save(board);
    }

    public void deletePost(int boardNumber) {
        boardRepository.deleteById(boardNumber);
    }
}
