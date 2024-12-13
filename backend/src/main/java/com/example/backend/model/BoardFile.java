package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "board_file")
public class BoardFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false) // null이 될 수 없도록 설정
    private String fileUrl; // 이 줄을 추가합니다.

    @ManyToOne
    @JoinColumn(name = "board_number", nullable = false)
    private Board board; // 이 BoardFile이 어떤 Board에 속하는지 나타냅니다.
}
