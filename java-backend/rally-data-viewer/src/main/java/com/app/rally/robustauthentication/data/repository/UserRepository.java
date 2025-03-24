package com.app.rally.robustauthentication.data.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.robustauthentication.data.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    public User findByUsername(String username);
}
