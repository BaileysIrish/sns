package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    // 생성자 주입 방식
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(UserDto userDto) {
        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword()); // 암호화 필요 시 추가
        user.setNickname(userDto.getNickname());
        user.setTelNumber(userDto.getTelNumber());
        user.setProfileImage(userDto.getProfileImage());

        userRepository.save(user);
    }
    public User authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }
}
