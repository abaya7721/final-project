package com.app.rally.controller;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @RequestMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> events = eventRepository.findAll();
        return ResponseEntity.ok(events);
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

    
    @RequestMapping("/standings")
    public ResponseEntity<List<Standing>> getStandings() {
        List<Standing> standings = standingsRepository.findAll();
        return ResponseEntity.ok(standings);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @RequestMapping("/standings2016")
    public ResponseEntity<List<StandingsDriverTeamDTO>> getStandingsWithDriver() {
      List<StandingsDriverTeamDTO> standings = standingsRepository.findAllWithDriverAndTeam();
        return ResponseEntity.ok(standings);
    }

    // Driver endpoints
    @PostMapping("/driver")
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        Driver newDriver = driverRepository.save(driver);

        return ResponseEntity.ok(newDriver);
    }

    @PutMapping("/driver/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable Integer id, @RequestBody Driver driver) {
        driver.setId(id);
        Driver updatedDriver = driverRepository.save(driver);
        return ResponseEntity.ok(updatedDriver);
    }

    @DeleteMapping("/driver/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Integer id) {
        driverRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Vehicle endpoints
    @PostMapping("/vehicle")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle newVehicle = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(newVehicle);
    }

    @PutMapping("/vehicle/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable Integer id, @RequestBody Vehicle vehicle) {
        vehicle.setId(id);
        Vehicle updatedVehicle = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(updatedVehicle);
    }

    @DeleteMapping("/vehicle/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Integer id) {
        vehicleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Team endpoints
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/team")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        Team newTeam = teamRepository.save(team);
        return ResponseEntity.ok(newTeam);
    }

    @PutMapping("/team/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Integer id, @RequestBody Team team) {
        team.setId(id);
        Team updatedTeam = teamRepository.save(team);
        return ResponseEntity.ok(updatedTeam);
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Integer id) {
        teamRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Event endpoints
    @PostMapping("/event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event newEvent = eventRepository.save(event);
        return ResponseEntity.ok(newEvent);
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Integer id, @RequestBody Event event) {
        event.setId(id);
        Event updatedEvent = eventRepository.save(event);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}


