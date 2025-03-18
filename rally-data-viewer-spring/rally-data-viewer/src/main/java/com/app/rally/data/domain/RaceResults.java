package com.app.rally.data.domain;

import jakarta.persistence.*;

import java.time.Duration;
import java.time.Year;
import java.util.Objects;

@Entity
@Table(name = "race_results")
public class RaceResults {

    @Id
    private Integer id;
    private int position;
    private int minutes;
    private int seconds;
    private int milliseconds;
    private Year year;
    private Duration duration;

    public RaceResults() {
    }

    public RaceResults(Integer id, int position, int minutes, int seconds, int milliseconds, Year year) {
        this.id = id;
        this.position = position;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
        this.year = year;
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

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }

    public int getMilliseconds() {
        return milliseconds;
    }

    public void setMilliseconds(int milliseconds) {
        this.milliseconds = milliseconds;
    }

    public Year getYear() {
        return year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration() {
        this.duration = Duration.ofMinutes(minutes).plusSeconds(seconds).plusMillis(milliseconds);
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof RaceResults that)) return false;
        return getPosition() == that.getPosition() && getMinutes() == that.getMinutes() && getSeconds() == that.getSeconds() && getMilliseconds() == that.getMilliseconds() && Objects.equals(getId(), that.getId()) && Objects.equals(getYear(), that.getYear()) && Objects.equals(getDuration(), that.getDuration());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPosition(), getMinutes(), getSeconds(), getMilliseconds(), getYear(), getDuration());
    }

    @Override
    public String toString() {
        return "RaceResults{" +
                "id=" + id +
                ", position=" + position +
                ", minutes=" + minutes +
                ", Year=" + year +
                ", milliseconds=" + milliseconds +
                ", seconds=" + seconds +
                '}';
    }
}

