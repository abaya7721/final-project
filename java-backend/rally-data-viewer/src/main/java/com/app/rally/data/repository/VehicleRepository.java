package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.rally.data.domain.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    @Query("SELECT v FROM Vehicle v WHERE v.id = :id")
    Vehicle findVehicleById(@Param("id") Integer id);
    
    @Modifying
    @Query("DELETE FROM Vehicle v WHERE v.id = :id")
    void deleteVehicleById(@Param("id") Integer id);
    
    @Modifying
    @Query("UPDATE Vehicle v SET v.model = :model, v.make = :make, v.year = :year WHERE v.id = :id")
    void updateVehicle(@Param("id") Integer id, 
                      @Param("model") String model, 
                      @Param("make") String make, 
                      @Param("year") String year);
}
