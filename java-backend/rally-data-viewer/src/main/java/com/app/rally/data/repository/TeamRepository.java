package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}
