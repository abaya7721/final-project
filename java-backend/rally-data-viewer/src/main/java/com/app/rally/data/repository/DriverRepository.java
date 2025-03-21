package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.Driver;

public interface DriverRepository extends JpaRepository<Driver, Integer> {

}
