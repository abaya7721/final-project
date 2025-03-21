package com.app.rally.data.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.rally.data.domain.Event;

public interface EventRepository extends JpaRepository <Event, Integer> {
}
