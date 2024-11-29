package com.example.sampleproject.controller;

import com.example.sampleproject.model.User;
import com.example.sampleproject.model.ERole;
import com.example.sampleproject.service.AuthService;
import com.example.sampleproject.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(
        @RequestBody User user, 
        @RequestParam(required = false) Set<ERole> roles
    ) {
        User registeredUser = authService.registerUser(user, roles);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
        @RequestParam String username, 
        @RequestParam String password
    ) {
        String jwt = authService.authenticateUser(username, password);
        return ResponseEntity.ok(jwt);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User currentUser = new User();
        currentUser.setId(userDetails.getId());
        currentUser.setUsername(userDetails.getUsername());

        authService.updateUserProfile(currentUser, updatedUser);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
        @RequestParam String oldPassword, 
        @RequestParam String newPassword
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = new User();
        user.setId(userDetails.getId());
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());

        authService.changePassword(user, oldPassword, newPassword);
        return ResponseEntity.ok("Password changed successfully");
    }
}
