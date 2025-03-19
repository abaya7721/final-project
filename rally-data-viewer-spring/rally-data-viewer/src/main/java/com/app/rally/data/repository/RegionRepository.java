package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.Region;

public interface RegionRepository extends JpaRepository<Region, Integer> {
}
