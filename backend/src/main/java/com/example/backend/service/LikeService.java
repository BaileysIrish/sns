package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.model.Like;
import com.example.backend.model.User;
import com.example.backend.repository.BoardRepository;
import com.example.backend.repository.LikeRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public LikeService(LikeRepository likeRepository, BoardRepository boardRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    public int toggleLike(String email, int boardNumber) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        Board board = boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalArgumentException("Board not found."));
        Optional<Like> existingLike = likeRepository.findByUserAndBoard(user, board);

        if (existingLike.isPresent()) {
            likeRepository.delete(existingLike.get());
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setBoard(board);
            likeRepository.save(like);
        }

        return likeRepository.countByBoard(board);
    }

    public int getLikeCount(int boardNumber) {
        Board board = boardRepository.findById(boardNumber)
                .orElseThrow(() -> new IllegalArgumentException("Board not found."));
        return likeRepository.countByBoard(board);
    }

}
