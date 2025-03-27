package com.app.rally;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.Year;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

import com.app.rally.controller.RallyDataController;
import com.app.rally.data.domain.Driver;
import com.app.rally.data.domain.Event;
import com.app.rally.data.domain.RaceResults;
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

@SpringBootTest
class RallyDataViewerApplicationTests {

	@Autowired
	private RallyDataController rallyDataController;

	@MockBean
	private DriverRepository driverRepository;

	@MockBean
	private VehicleRepository vehicleRepository;

	@MockBean
	private TeamRepository teamRepository;

	@MockBean
	private EventRepository eventRepository;

	@MockBean
	private RaceResultsRepository raceResultsRepository;

	@MockBean
	private StandingsRepository standingsRepository;

	private Driver testDriver;
	private Vehicle testVehicle;
	private Team testTeam;
	private Event testEvent;
	private RaceResults testRaceResult;
	private Standing testStanding;

	@BeforeEach
	void setUp() {
		// Initialize test data
		testDriver = new Driver(1, "Test Driver", "Test Country");
		testVehicle = new Vehicle(1, "Test Model", "Test Make", "2024");
		testTeam = new Team(1, "Test Team");
		testEvent = new Event(1, "Test Race", LocalDate.now());
		testRaceResult = new RaceResults(1, 1, 1.5f, 500);
		testStanding = new Standing(10, Year.of(2024), 1);

		// Set up relationships
		testTeam.setVehicle(testVehicle);
		testDriver.setTeam(testTeam);
		testRaceResult.setDriver(testDriver);
		testRaceResult.setEvent(testEvent);
		testStanding.setDriver(testDriver);
	}

	@Test
	void contextLoads() {
		assertNotNull(rallyDataController);
	}

	@Test
	void testGetDrivers() {
		when(driverRepository.findAll()).thenReturn(Arrays.asList(testDriver));

		ResponseEntity<List<Driver>> response = rallyDataController.getDrivers();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals(testDriver.getName(), response.getBody().get(0).getName());
	}

	@Test
	void testGetVehicles() {
		when(vehicleRepository.findAll()).thenReturn(Arrays.asList(testVehicle));

		ResponseEntity<List<Vehicle>> response = rallyDataController.getVehicles();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals(testVehicle.getModel(), response.getBody().get(0).getModel());
	}

	@Test
	void testGetTeams() {
		when(teamRepository.findAll()).thenReturn(Arrays.asList(testTeam));

		ResponseEntity<List<Team>> response = rallyDataController.getTeams();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals(testTeam.getTeamName(), response.getBody().get(0).getTeamName());
	}

	@Test
	void testGetEvents() {
		when(eventRepository.findAll()).thenReturn(Arrays.asList(testEvent));

		ResponseEntity<List<Event>> response = rallyDataController.getEvents();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals(testEvent.getName(), response.getBody().get(0).getName());
	}

	@Test
	void testGetRaceResults2016() {
		RaceResultsDriverEventRegionDTO dto = new RaceResultsDriverEventRegionDTO(
			1, "Test Driver", "Test Country", "Test Race", "Test Country", "Test Region",
			1, LocalDate.now(), 1.5f, 500
		);
		when(raceResultsRepository.findAllWithDriverEventAndRegion())
			.thenReturn(Arrays.asList(dto));

		ResponseEntity<List<RaceResultsDriverEventRegionDTO>> response = 
			rallyDataController.getRaces2016();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals("Test Driver", response.getBody().get(0).getDriverName());
	}

	@Test
	void testGetRaceResults2016WithVehicle() {
		RaceResultsDriverVehicleDTO dto = new RaceResultsDriverVehicleDTO(
			1, "Test Driver", "Test Country", "Test Model", "Test Make", "2024",
			1, 1.5f, 500
		);
		when(raceResultsRepository.findAllWithDriverAndVehicle())
			.thenReturn(Arrays.asList(dto));

		ResponseEntity<List<RaceResultsDriverVehicleDTO>> response = 
			rallyDataController.getRaces2016WithVehicle();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals("Test Driver", response.getBody().get(0).getDriverName());
	}

	@Test
	void testGetStandings() {
		when(standingsRepository.findAll()).thenReturn(Arrays.asList(testStanding));

		ResponseEntity<List<Standing>> response = rallyDataController.getStandings();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals(10, response.getBody().get(0).getPoints());
	}

	@Test
	void testGetStandingsWithDriver() {
		StandingsDriverTeamDTO dto = new StandingsDriverTeamDTO(
			1, "Test Driver", "Test Country", "Test Team", 10, Year.of(2024)
		);
		when(standingsRepository.findAllWithDriverAndTeam())
			.thenReturn(Arrays.asList(dto));

		ResponseEntity<List<StandingsDriverTeamDTO>> response = 
			rallyDataController.getStandingsWithDriver();
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(1, response.getBody().size());
		assertEquals("Test Driver", response.getBody().get(0).getDriverName());
	}

	@Test
	void testCreateDriver() {
		when(driverRepository.save(any(Driver.class))).thenReturn(testDriver);

		ResponseEntity<Driver> response = rallyDataController.createDriver(testDriver);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testDriver.getName(), response.getBody().getName());
	}

	@Test
	void testUpdateDriver() {
		when(driverRepository.save(any(Driver.class))).thenReturn(testDriver);

		ResponseEntity<Driver> response = rallyDataController.updateDriver(1, testDriver);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testDriver.getName(), response.getBody().getName());
	}

	@Test
	void testDeleteDriver() {
		ResponseEntity<Void> response = rallyDataController.deleteDriver(1);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		verify(driverRepository).deleteById(1);
	}

	@Test
	void testCreateVehicle() {
		when(vehicleRepository.save(any(Vehicle.class))).thenReturn(testVehicle);

		ResponseEntity<Vehicle> response = rallyDataController.createVehicle(testVehicle);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testVehicle.getModel(), response.getBody().getModel());
	}

	@Test
	void testUpdateVehicle() {
		when(vehicleRepository.save(any(Vehicle.class))).thenReturn(testVehicle);

		ResponseEntity<Vehicle> response = rallyDataController.updateVehicle(1, testVehicle);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testVehicle.getModel(), response.getBody().getModel());
	}

	@Test
	void testDeleteVehicle() {
		ResponseEntity<Void> response = rallyDataController.deleteVehicle(1);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		verify(vehicleRepository).deleteById(1);
	}

	@Test
	void testCreateTeam() {
		when(teamRepository.save(any(Team.class))).thenReturn(testTeam);

		ResponseEntity<Team> response = rallyDataController.createTeam(testTeam);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testTeam.getTeamName(), response.getBody().getTeamName());
	}

	@Test
	void testUpdateTeam() {
		when(teamRepository.save(any(Team.class))).thenReturn(testTeam);

		ResponseEntity<Team> response = rallyDataController.updateTeam(1, testTeam);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testTeam.getTeamName(), response.getBody().getTeamName());
	}

	@Test
	void testDeleteTeam() {
		ResponseEntity<Void> response = rallyDataController.deleteTeam(1);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		verify(teamRepository).deleteById(1);
	}

	@Test
	void testCreateEvent() {
		when(eventRepository.save(any(Event.class))).thenReturn(testEvent);

		ResponseEntity<Event> response = rallyDataController.createEvent(testEvent);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testEvent.getName(), response.getBody().getName());
	}

	@Test
	void testUpdateEvent() {
		when(eventRepository.save(any(Event.class))).thenReturn(testEvent);

		ResponseEntity<Event> response = rallyDataController.updateEvent(1, testEvent);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		assertEquals(testEvent.getName(), response.getBody().getName());
	}

	@Test
	void testDeleteEvent() {
		ResponseEntity<Void> response = rallyDataController.deleteEvent(1);
		
		assertNotNull(response);
		assertEquals(200, response.getStatusCodeValue());
		verify(eventRepository).deleteById(1);
	}
}
