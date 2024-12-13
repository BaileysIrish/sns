package com.example.backend.dto;

import com.example.backend.model.Follow;
import com.example.backend.model.Story;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class UserDto {
    private String email;
    private String password;
    private String nickname;
    private String telNumber;
    private String profileImage;

    private Set<Follow> followers = new HashSet<>();

    private List<Story> stories = new ArrayList<>();

    @Override
    public String toString() {
        return "UserDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", telNumber='" + telNumber + '\'' +
                ", profileImage='" + profileImage + '\'' +
                ", followers=" + followers +
                ", stories=" + stories +
                '}';
    }
}
