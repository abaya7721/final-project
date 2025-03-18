package com.app.rally.data.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Year;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name="events")
public class Event {
    @Id
    private Integer id;
    private String raceName;
    private Year year;

    public Event() {
    }

    public Event(Integer id, String name, Year year) {
        this.id = id;
        this.raceName = name;
        this.year = year;
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

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Event event)) return false;
        return Objects.equals(getId(), event.getId()) && Objects.equals(raceName, event.raceName) && Objects.equals(year, event.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), raceName, year);
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", raceName='" + raceName + '\'' +
                ", date=" + year +
                '}';
    }
}
