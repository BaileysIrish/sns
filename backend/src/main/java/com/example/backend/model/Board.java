package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardNumber;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime writeDatetime;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int favoriteCount;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int commentCount;

    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
    private int viewCount;

    @Column(nullable = false, length = 50)
    private String email;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardFile> files = new ArrayList<>(); // 기본값으로 빈 리스트 초기화
}
