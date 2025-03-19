package com.app.rally.data.domain;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "race_results")
public class RaceResults {

    @Id
    private Integer id;
    private int position;
    @Column(name = "minutes_seconds")
    private double minutesSeconds;
    private float milliseconds;
    

    public RaceResults() {
    }

    public RaceResults(Integer id, int position, float minutesSeconds, float milliseconds) {
        this.id = id;
        this.position = position;
        this.minutesSeconds = minutesSeconds;
        this.milliseconds = milliseconds/1000;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public double getMinutesSeconds() {
        return minutesSeconds;
    }

    public void setMinutesSeconds(float minutesSeconds) {
        this.minutesSeconds = minutesSeconds;
    }


    public float getMilliseconds() {
        return milliseconds;
    }

    public void setMilliseconds(int milliseconds) {
        this.milliseconds = milliseconds;
    }


    @Override
    public boolean equals(Object o) {
        if (!(o instanceof RaceResults that)) return false;
        return getPosition() == that.getPosition() && getMinutesSeconds() == that.getMinutesSeconds() && getMilliseconds() == that.getMilliseconds() && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPosition(), getMinutesSeconds(), getMilliseconds());
    }

    @Override
    public String toString() {
        return "RaceResults{" +
                "id=" + id +
                ", position=" + position +
                ", minutesSeconds=" + minutesSeconds +
                ", milliseconds=" + milliseconds +
                '}';
    }
}
