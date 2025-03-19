package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.RaceResults;

public interface RaceResultsRepository extends JpaRepository<RaceResults, Integer> {
}
