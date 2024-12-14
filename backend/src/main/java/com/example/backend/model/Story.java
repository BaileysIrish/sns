package com.example.backend.model;

import com.example.backend.dto.UserDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "Stories")
@Getter
@Setter
public class Story {

    public Story() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    // 유저와 Story의 관계 설정
    @ManyToOne(fetch = FetchType.LAZY) // 한 유저는 여러 Story를 가질 수 있음
    @JoinColumn(name = "user_id", nullable = false) // foreign key 이름
    private User user;

    @Column(nullable = false)
    private String image;

    private String caption;

    @Column(nullable = false)
    private LocalDateTime timestamp;

}
