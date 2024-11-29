package com.example.sampleproject.controller;

import com.example.sampleproject.model.User;
import com.example.sampleproject.model.ERole;
import com.example.sampleproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> activeUsers = userService.findActiveUsers();
        return ResponseEntity.ok(activeUsers);
    }

    @PutMapping("/users/{userId}/roles")
    public ResponseEntity<?> updateUserRoles(
        @PathVariable Long userId, 
        @RequestBody Set<ERole> newRoles
    ) {
        User updatedUser = userService.updateUserRoles(userId, newRoles);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/{userId}/disable")
    public ResponseEntity<?> disableUser(@PathVariable Long userId) {
        userService.disableUser(userId);
        return ResponseEntity.ok("User disabled successfully");
    }

    @PutMapping("/users/{userId}/enable")
    public ResponseEntity<?> enableUser(@PathVariable Long userId) {
        userService.enableUser(userId);
        return ResponseEntity.ok("User enabled successfully");
    }

    @GetMapping("/users/by-role/{roleName}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable ERole roleName) {
        List<User> users = userService.findUsersByRoleName(roleName);
        return ResponseEntity.ok(users);
    }
}
