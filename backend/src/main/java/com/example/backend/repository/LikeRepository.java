package com.example.backend.repository;

import com.example.backend.model.Like;
import com.example.backend.model.User;
import com.example.backend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Integer> {
    Optional<Like> findByUserAndBoard(User user, Board board);
    int countByBoard(Board board);
}
