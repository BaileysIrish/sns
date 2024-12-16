package com.example.backend.controller;

import com.example.backend.service.LikeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{boardNumber}")
    public int toggleLike(@RequestParam String email, @PathVariable int boardNumber) {
        return likeService.toggleLike(email, boardNumber);
    }

    @GetMapping("/{boardNumber}")
    public int getLikeCount(@PathVariable int boardNumber) {
        return likeService.getLikeCount(boardNumber);
    }
}
