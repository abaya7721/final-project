package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.Standing;

public interface StandingsRepository extends JpaRepository<Standing, Integer> {
}
