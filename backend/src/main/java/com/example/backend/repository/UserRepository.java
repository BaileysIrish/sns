package com.example.backend.repository;



import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, String> {
    // 이메일로만 사용자 찾기
    User findByEmail(String email);
    List<User> findAll();
}
