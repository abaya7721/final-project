package com.app.rally.controller;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.rally.data.domain.Driver;
import com.app.rally.data.domain.Event;
import com.app.rally.data.domain.Standing;
import com.app.rally.data.domain.Team;
import com.app.rally.data.domain.Vehicle;
import com.app.rally.data.dto.RaceResultsDriverEventRegionDTO;
import com.app.rally.data.dto.RaceResultsDriverVehicleDTO;
import com.app.rally.data.dto.StandingsDriverTeamDTO;
import com.app.rally.data.repository.DriverRepository;
import com.app.rally.data.repository.EventRepository;
import com.app.rally.data.repository.RaceResultsRepository;
import com.app.rally.data.repository.StandingsRepository;
import com.app.rally.data.repository.TeamRepository;
import com.app.rally.data.repository.VehicleRepository;

@RestController
@RequestMapping("/rally")
public class RallyDataController implements Serializable{

    @Autowired
    DriverRepository driverRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    RaceResultsRepository raceResultsRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    StandingsRepository standingsRepository;


    @RequestMapping("/drivers")
    public ResponseEntity<List<Driver>> getDrivers() {
        List<Driver> drivers = driverRepository.findAll();
        return ResponseEntity.ok(drivers);
    }

    @RequestMapping("/vehicles")
    public ResponseEntity<List<Vehicle>> getVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        return ResponseEntity.ok(vehicles);
    }

    @RequestMapping("/teams")
    public ResponseEntity<List<Team>> getTeams() {
        List<Team> teams = teamRepository.findAll();
        return ResponseEntity.ok(teams);
    }

    // @RequestMapping("/results")
    // public ResponseEntity<List<RaceResults>> getRaces() {
    //     List<RaceResults> races = raceResultsRepository.findAll();
    //     return ResponseEntity.ok(races);
    // }

    @RequestMapping("/results2016")
    public ResponseEntity<List<RaceResultsDriverEventRegionDTO>> getRaces2016() {
        List<RaceResultsDriverEventRegionDTO> races = raceResultsRepository.findAllWithDriverEventAndRegion();
        return ResponseEntity.ok(races);
    }

    @RequestMapping("/results2016/vehicle")
    public ResponseEntity<List<RaceResultsDriverVehicleDTO>> getRaces2016WithVehicle() {
        List<RaceResultsDriverVehicleDTO> races = raceResultsRepository.findAllWithDriverAndVehicle();
        return ResponseEntity.ok(races);
    }

    @RequestMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
    }
    
    @RequestMapping("/standings")
    public ResponseEntity<List<Standing>> getStandings() {
        List<Standing> standings = standingsRepository.findAll();
        return ResponseEntity.ok(standings);
    }

    @RequestMapping("/standings2016")
    public ResponseEntity<List<StandingsDriverTeamDTO>> getStandingsWithDriver() {
      List<StandingsDriverTeamDTO> standings = standingsRepository.findAllWithDriverAndTeam();
        return ResponseEntity.ok(standings);
    }

    
    

    
}


