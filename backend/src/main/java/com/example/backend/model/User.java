package com.example.backend.model;


import com.example.backend.dto.UserDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.*;

import java.util.HashSet;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {

    @Id
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, unique = true, length = 20)
    private String nickname;

    @Column(name = "tel_number", nullable = false, unique = true, length = 15)
    private String telNumber;

    @Column(name = "profile_image", columnDefinition = "TEXT")
    private String profileImage;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Follow> followers = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Story> stories = new ArrayList<>();
}

