package com.example.backend.service;

import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        // 이메일로 사용자 조회
        User user = userRepository.findByEmail(email);

        // 사용자가 존재하지 않는 경우
        if (user == null) {
            throw new IllegalArgumentException("해당 이메일로 등록된 사용자가 없습니다.");
        }

        // 비밀번호가 일치하지 않는 경우
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 인증 성공 시 사용자 반환
        return user;
    }

    // 특정 사용자 엔티티를 UserDto로 변환
    public UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setNickname(user.getNickname());
        userDto.setTelNumber(user.getTelNumber());
        userDto.setProfileImage(user.getProfileImage());
        return userDto;
    }

    // 모든 사용자 정보 반환
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 이메일로 사용자 찾기
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
