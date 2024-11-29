package com.example.sampleproject.repository;

import com.example.sampleproject.model.ERole;
import com.example.sampleproject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    // Find role by name
    Optional<Role> findByName(ERole name);
    
    // Check if role exists
    boolean existsByName(ERole name);
    
    // Find all role names
    @Query("SELECT r.name FROM Role r")
    List<ERole> findAllRoleNames();
    
    // Count users in a specific role
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = :roleName")
    long countUsersInRole(@Param("roleName") ERole roleName);
    
    // Find roles with more than a specified number of users
    @Query("SELECT r FROM Role r JOIN r.users u GROUP BY r HAVING COUNT(u) > :minUsers")
    List<Role> findRolesWithMoreThanUsers(@Param("minUsers") long minUsers);
    
    // Find default roles (if applicable)
    @Query("SELECT r FROM Role r WHERE r.isDefault = true")
    List<Role> findDefaultRoles();
    
    // Find roles created before a specific date (if you track role creation)
    @Query("SELECT r FROM Role r WHERE r.createdAt < :date")
    List<Role> findRolesCreatedBefore(@Param("date") java.util.Date date);
}