package com.example.backend.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "follow")
@Getter
@Setter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 팔로우를 받는 사용자 (팔로워)
    @ManyToOne
    @JoinColumn(name = "user_email", nullable = false)
    private User user;

    // 팔로우를 하는 사용자 (팔로우)
    @Column(name = "follower_email", nullable = false)
    private String followerEmail;
}
