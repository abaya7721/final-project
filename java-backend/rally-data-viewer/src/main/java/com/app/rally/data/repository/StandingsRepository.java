package com.app.rally.data.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.rally.data.domain.Standing;
import com.app.rally.data.dto.StandingsDriverTeamDTO;

public interface StandingsRepository extends JpaRepository<Standing, Integer> {
    
    @Query("SELECT DISTINCT new com.app.rally.data.dto.StandingsDriverTeamDTO(" +
           "s.id, d.name, d.nationality, t.teamName, " +
           "s.points, s.year) " +
           "FROM Standing s " +
           "LEFT JOIN s.driver d " +
           "LEFT JOIN d.team t")
    List<StandingsDriverTeamDTO> findAllWithDriverAndTeam();
}
