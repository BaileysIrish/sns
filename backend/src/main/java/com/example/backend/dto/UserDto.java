package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private String email;
    private String password;
    private String nickname;
    private String telNumber;
    private String profileImage;
    private String bio;
}
