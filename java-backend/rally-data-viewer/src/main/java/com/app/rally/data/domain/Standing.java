package com.app.rally.data.domain;

import java.time.Year;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="standings")
public class Standing {

    @Id
    private Integer id;
    private Year year;
    private int points;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    public Standing() {
    }

    public Standing(int points, Year year, Integer id) {
        this.points = points;
        this.year = year;
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Standing standings)) return false;
        return getPoints() == standings.getPoints() && Objects.equals(getId(), standings.getId()) && Objects.equals(getYear(), standings.getYear());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getYear(), getPoints());
    }

    @Override
    public String toString() {
        return "Standings{" +
                "id=" + id +
                ", year=" + year +
                ", points=" + points +
                '}';
    }
}
