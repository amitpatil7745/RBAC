package com.example.sampleproject.controller;


import com.example.sampleproject.model.User;
import com.example.sampleproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/moderator")
@PreAuthorize("hasRole('MODERATOR')")
public class ModeratorController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> activeUsers = userService.findActiveUsers();
        return ResponseEntity.ok(activeUsers);
    }

    @GetMapping("/users/search")
    public ResponseEntity<?> findUserByUsername(@RequestParam String username) {
        return userService.findByUsername(username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
