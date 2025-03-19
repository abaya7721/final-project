package com.app.rally.data.domain;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="events")
public class Event {
    @Id
    private Integer id;
    private String raceName;
    private LocalDate date;

    public Event() {
    }

    public Event(Integer id, String name, LocalDate date) {
        this.id = id;
        this.raceName = name;
        this.date = date;   
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return raceName;
    }

    public void setName(String name) {
        this.raceName = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Event event)) return false;
        return Objects.equals(getId(), event.getId()) && Objects.equals(raceName, event.raceName) && Objects.equals(date, event.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), raceName, date);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", raceName='" + raceName + '\'' +
                ", date=" + date +
                '}';
    }
}
