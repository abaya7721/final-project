package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

}
