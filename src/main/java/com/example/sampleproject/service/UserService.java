package com.example.sampleproject.service;


import com.example.sampleproject.model.User;
import com.example.sampleproject.model.Role;
import com.example.sampleproject.model.ERole;
import com.example.sampleproject.repository.UserRepository;
import com.example.sampleproject.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> findActiveUsers() {
        return userRepository.findActiveUsers();
    }

    @Transactional
    public User updateUserRoles(Long userId, Set<ERole> newRoles) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Clear existing roles
        user.getRoles().clear();

        // Add new roles
        for (ERole roleName : newRoles) {
            Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            user.getRoles().add(role);
        }

        return userRepository.save(user);
    }

    @Transactional
    public void disableUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        user.setEnabled(false);
        user.setAccountNonLocked(false);
        userRepository.save(user);
    }

    @Transactional
    public void enableUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        user.setEnabled(true);
        user.setAccountNonLocked(true);
        user.setFailedAttempt(0);
        userRepository.save(user);
    }

    public List<User> findUsersByRoleName(ERole roleName) {
        return userRepository.findUsersByRoleName(roleName.name());
    }
}