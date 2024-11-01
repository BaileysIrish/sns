package com.example.backend.controller;

import com.example.backend.model.Board;
import com.example.backend.service.BoardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/create")
    public ResponseEntity<Board> createPost(@RequestBody Board board) {
        return ResponseEntity.ok(boardService.createPost(board));
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Board>> getAllPosts() {
        return ResponseEntity.ok(boardService.getAllPosts());
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<Board> getPostById(@PathVariable int id) {
        return ResponseEntity.ok(boardService.getPostById(id));
    }

    @PutMapping("/update")
    public ResponseEntity<Board> updatePost(@RequestBody Board board) {
        return ResponseEntity.ok(boardService.updatePost(board));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable int id) {
        boardService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}
