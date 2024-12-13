package com.example.backend.controller;

import com.example.backend.dto.BoardDto;
import com.example.backend.dto.BoardFileDto;
import com.example.backend.model.Board;
import com.example.backend.model.BoardFile;
import com.example.backend.service.BoardService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @Value("${file.upload-dir.content-image}")
    private String contentImageDir; // 파일 저장 경로

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/create")
    public ResponseEntity<BoardDto> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("email") String email,
            @RequestParam("files") List<MultipartFile> files) {

        // 게시물 데이터 설정
        Board board = new Board();
        board.setTitle(title);
        board.setContent(content);
        board.setEmail(email);
        board.setWriteDatetime(LocalDateTime.now());

        // 게시물 저장
        Board savedBoard = boardService.createPost(board);

        // 파일 저장 및 게시물에 파일 정보 추가
        saveFiles(files, savedBoard);

        // DTO로 변환하여 응답
        BoardDto boardDto = convertToDto(savedBoard);
        return ResponseEntity.ok(boardDto);
    }

    @GetMapping("/posts")
    public ResponseEntity<List<BoardDto>> getAllPosts() {
        List<Board> boards = boardService.getAllPosts();
        List<BoardDto> boardDtos = boards.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(boardDtos);
    }

    @GetMapping("/posts/{boardNumber}")
    public ResponseEntity<BoardDto> getPostById(@PathVariable int boardNumber) {
        Board board = boardService.getPostById(boardNumber);
        if (board == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(convertToDto(board));
    }

    @PutMapping("/update/{boardNumber}")
    public ResponseEntity<BoardDto> updatePost(
            @PathVariable int boardNumber,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) {

        // 게시물 수정
        Board board = new Board();
        board.setBoardNumber(boardNumber);
        board.setTitle(title);
        board.setContent(content);

        Board updatedBoard = boardService.updatePost(board);

        // 파일 처리
        if (files != null && !files.isEmpty()) {
            saveFiles(files, updatedBoard);
        }

        return ResponseEntity.ok(convertToDto(updatedBoard));
    }

    @DeleteMapping("/delete/{boardNumber}")
    public ResponseEntity<Void> deletePost(@PathVariable int boardNumber) {
        boardService.deletePost(boardNumber);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/content-files/{filename:.+}")
    public ResponseEntity<Resource> getContentFile(@PathVariable String filename) {
        Path filePath = Paths.get(contentImageDir).resolve(filename);
        Resource resource = new FileSystemResource(filePath);
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM) // 필요에 따라 MIME 타입 설정
                .body(resource);
    }

    private void saveFiles(List<MultipartFile> files, Board savedBoard) {
        for (MultipartFile file : files) {
            if (file != null && !file.isEmpty()) {
                try {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    Path destinationPath = Paths.get(contentImageDir, fileName);
                    File directory = new File(contentImageDir);
                    if (!directory.exists()) {
                        directory.mkdirs();
                    }

                    Files.copy(file.getInputStream(), destinationPath);

                    BoardFile boardFile = new BoardFile();
                    boardFile.setFilePath(destinationPath.toString());
                    boardFile.setFileType(file.getContentType());
                    boardFile.setFileUrl("http://localhost:8080/api/board/content-files/" + fileName); // fileUrl 설정
                    boardFile.setBoard(savedBoard);
                    boardService.saveFile(boardFile);
                } catch (IOException e) {
                    e.printStackTrace();
                    // 적절한 에러 처리를 수행해야 합니다.
                }
            }
        }
    }

    private BoardDto convertToDto(Board board) {
        BoardDto boardDto = new BoardDto();
        boardDto.setBoardNumber(board.getBoardNumber());
        boardDto.setTitle(board.getTitle());
        boardDto.setContent(board.getContent());
        boardDto.setEmail(board.getEmail());
        boardDto.setFiles(board.getFiles().stream().map(file -> {
            BoardFileDto fileDto = new BoardFileDto();
            fileDto.setFilePath(file.getFilePath());
            fileDto.setFileType(file.getFileType());
            fileDto.setFileUrl(file.getFileUrl()); // fileUrl도 추가
            return fileDto;
        }).collect(Collectors.toList()));
        return boardDto;
    }
}
