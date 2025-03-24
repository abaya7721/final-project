package com.app.rally.authentication.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepositoryNew extends JpaRepository<UserNew, UUID> {
    public UserNew findByUsername(String username);
}
