package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.rally.data.domain.Team;
import com.app.rally.data.domain.Vehicle;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    
    @Query("SELECT t FROM Team t WHERE t.id = :id")
    Team findTeamById(@Param("id") Integer id);
    
    @Modifying
    @Query("DELETE FROM Team t WHERE t.id = :id")
    void deleteTeamById(@Param("id") Integer id);
    
    @Modifying
    @Query("UPDATE Team t SET t.teamName = :teamName, t.vehicle = :vehicle WHERE t.id = :id")
    void updateTeam(@Param("id") Integer id, 
                   @Param("teamName") String teamName,
                   @Param("vehicle") Vehicle vehicle);
}
