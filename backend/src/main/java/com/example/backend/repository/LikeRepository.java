package com.example.backend.repository;

import com.example.backend.model.Like;
import com.example.backend.model.Board;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> { // Integer로 수정

    Optional<Like> findByBoardAndUser(Board board, User user);

    int countByBoard(Board board);

    void deleteByBoardAndUser(Board board, User user);
}
