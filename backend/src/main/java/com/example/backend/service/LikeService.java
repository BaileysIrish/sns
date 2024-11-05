package com.example.backend.service;

import com.example.backend.model.Board;
import com.example.backend.model.Like;
import com.example.backend.model.User;
import com.example.backend.repository.LikeRepository;
import com.example.backend.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Transactional
    public void toggleLike(Board board, User user) {
        likeRepository.findByBoardAndUser(board, user).ifPresentOrElse(
                existingLike -> {
                    // If a like exists, remove it (unlike)
                    likeRepository.deleteByBoardAndUser(board, user);
                    // Decrease favorite count on board
                    board.setFavoriteCount(board.getFavoriteCount() - 1);
                },
                () -> {
                    // If no like exists, add a new like
                    Like like = new Like();
                    like.setBoard(board);
                    like.setUser(user);
                    likeRepository.save(like);
                    // Increase favorite count on board
                    board.setFavoriteCount(board.getFavoriteCount() + 1);
                }
        );
        // Save the updated board entity with the new favorite count
        boardRepository.save(board);
    }

    public int getLikeCount(Board board) { // int로 수정
        return likeRepository.countByBoard(board); // int로 수정
    }
}
