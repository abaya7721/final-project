package com.app.rally.data.domain;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name="standings")
public class Standings {

    @Id
    private Integer id;
    private Date year;
    private int points;

    public Standings() {
    }

    public Standings(int points, Date year, Integer id) {
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

    public Date getYear() {
        return year;
    }

    public void setYear(Date year) {
        this.year = year;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Standings standings)) return false;
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
