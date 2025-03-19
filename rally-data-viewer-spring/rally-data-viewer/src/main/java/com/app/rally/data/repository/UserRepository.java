package com.app.rally.data.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.authentication.data.User;

public interface UserRepository extends JpaRepository<User, UUID> {
}
