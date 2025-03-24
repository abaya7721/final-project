package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.rally.data.domain.Driver;
import com.app.rally.data.domain.Team;

public interface DriverRepository extends JpaRepository<Driver, Integer> {
    
    @Query("SELECT d FROM Driver d WHERE d.id = :id")
    Driver findDriverById(@Param("id") Integer id);
    
    @Modifying
    @Query("DELETE FROM Driver d WHERE d.id = :id")
    void deleteDriverById(@Param("id") Integer id);
    
    @Modifying
    @Query("UPDATE Driver d SET d.name = :name, d.nationality = :nationality, d.team = :team WHERE d.id = :id")
    void updateDriver(@Param("id") Integer id, 
                     @Param("name") String name, 
                     @Param("nationality") String nationality,
                     @Param("team") Team team);
}
