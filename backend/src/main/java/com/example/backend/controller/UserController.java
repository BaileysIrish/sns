package com.example.backend.controller;

import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.UserDto;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Value("${profile.image.upload-dir}")
    private String uploadDir;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("nickname") String nickname,
            @RequestParam("telNumber") String telNumber,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

        String imageUrl = null;

        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                imageUrl = saveImage(profileImage); // 이미지 저장 후 URL 생성
            } catch (IOException e) {
                return ResponseEntity.status(500).body("파일 저장 중 오류가 발생했습니다.");
            }
        }

        UserDto userDto = new UserDto();
        userDto.setEmail(email);
        userDto.setPassword(password);
        userDto.setNickname(nickname);
        userDto.setTelNumber(telNumber);
        userDto.setProfileImage(imageUrl);

        userService.registerUser(userDto); // 회원 정보를 저장

        return ResponseEntity.ok("회원 가입 성공");
    }

    private String saveImage(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        Path filePath = Paths.get(uploadDir + File.separator + filename);
        Files.copy(file.getInputStream(), filePath);

        // 저장된 파일의 경로를 URL로 변환 (예시: http://localhost:8080/images/filename)
        return "/images/" + filename;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            session.setAttribute("user", user);  // 세션에 사용자 정보를 저장

            // 이메일을 응답으로 반환하여 프론트엔드에서 사용할 수 있도록 함
            return ResponseEntity.ok(user.getEmail());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: 이메일 또는 비밀번호 오류");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();  // 세션을 무효화하여 로그아웃 처리
        return ResponseEntity.ok("로그아웃 성공");
    }

    // 현재 로그인한 사용자의 정보 가져오기
    @GetMapping("/current/{email}")
    public ResponseEntity<?> getCurrentUser(@PathVariable String email) {
        try {
            User user = userService.findUserByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("사용자를 찾을 수 없습니다.");
            }

            UserDto userDto = userService.convertToDto(user);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("사용자 정보를 가져오는 중 오류가 발생했습니다.");
        }
    }

    // 모든 사용자 정보 가져오기
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> allUsers = userService.getAllUsers();
        return ResponseEntity.ok(allUsers);
    }


}
