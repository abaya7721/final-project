package com.app.rally.data.dto;

import java.time.LocalDate;

public class RaceResultsDriverEventRegionDTO {

    private Integer raceId;
    private String driverName;
    private String driverNationality;
    private String raceName;
    private String country;
    private String region;
    private int position;
    private LocalDate date;
    private float minutesSeconds;
    private float milliseconds;

    

    public RaceResultsDriverEventRegionDTO() {
    }

    public RaceResultsDriverEventRegionDTO(Integer raceId, String driverName, String driverNationality, String raceName, String country, String region, int position, LocalDate date, float minutesSeconds, float milliseconds) {
        this.raceId = raceId;
        this.driverName = driverName;
        this.driverNationality = driverNationality;
        this.raceName = raceName;
        this.country = country;
        this.region = region;
        this.position = position;
        this.date = date;
        this.minutesSeconds = minutesSeconds;
        this.milliseconds = milliseconds;
    }   

    public Integer getRaceId() {
        return raceId;
    }

    public String getDriverName() {
        return driverName;
        }

    public String getDriverNationality() {
        return driverNationality;
    }
    public String getRaceName() {
        return raceName;
            }

    public String getCountry() {
        return country;
        }

    public String getRegion() {
        return region;
    }

    public int getPosition() {
        return position;
    }

    public LocalDate getDate() {
        return date;
    }

    public float getMinutesSeconds() {
        return minutesSeconds;
    }

    public float getMilliseconds() {
        return milliseconds;
    }
}

