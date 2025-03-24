package com.app.rally.data.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.rally.data.domain.Event;
import com.app.rally.data.domain.Region;

public interface EventRepository extends JpaRepository<Event, Integer> {
    
    @Query("SELECT e FROM Event e WHERE e.id = :id")
    Event findEventById(@Param("id") Integer id);
    
    @Modifying
    @Query("DELETE FROM Event e WHERE e.id = :id")
    void deleteEventById(@Param("id") Integer id);
    
    @Modifying
    @Query("UPDATE Event e SET e.raceName = :raceName, e.date = :date, e.region = :region WHERE e.id = :id")
    void updateEvent(@Param("id") Integer id, 
                    @Param("raceName") String raceName,
                    @Param("date") LocalDate date,
                    @Param("region") Region region);
}
