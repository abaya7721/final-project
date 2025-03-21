package com.app.rally.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.rally.data.domain.RaceResults;
import com.app.rally.data.dto.RaceResultsDriverEventRegionDTO;
import com.app.rally.data.dto.RaceResultsDriverVehicleDTO;

public interface RaceResultsRepository extends JpaRepository<RaceResults, Integer> {
    
    @Query("SELECT DISTINCT new com.app.rally.data.dto.RaceResultsDriverEventRegionDTO(" +
           "r.id, d.name, d.nationality, e.raceName, reg.country, reg.Region, " +
           "r.position, e.date, r.minutesSeconds, r.milliseconds) " +
           "FROM RaceResults r " +
           "LEFT JOIN r.driver d " +
           "LEFT JOIN r.event e " +
           "LEFT JOIN e.region reg")
    List<RaceResultsDriverEventRegionDTO> findAllWithDriverEventAndRegion();

    @Query("SELECT DISTINCT new com.app.rally.data.dto.RaceResultsDriverVehicleDTO(" +
           "r.id, d.name, d.nationality, v.model, v.make, v.year, " +
           "r.position, r.minutesSeconds, r.milliseconds) " +
           "FROM RaceResults r " +
           "LEFT JOIN r.driver d " +
           "LEFT JOIN d.team t " +
           "LEFT JOIN t.vehicle v")
    List<RaceResultsDriverVehicleDTO> findAllWithDriverAndVehicle();
}

