package com.app.rally.data.dto;

import java.time.Year;

public class StandingsDriverTeamDTO {
    private Integer standingsId;
    private String driverName;
    private String driverNationality;
    private String teamName;    
    private int points;
    private Year year;
    


    public StandingsDriverTeamDTO() {
    }

    public StandingsDriverTeamDTO(Integer standingsId, String driverName, String driverNationality, String teamName, int points, Year year) {
        this.standingsId = standingsId;
        this.driverName = driverName;
        this.driverNationality = driverNationality;
        this.teamName = teamName;
        this.points = points;
        this.year = year;
        }

    public Integer getStandingsId() {
        return standingsId;
    }

    public String getDriverName() {
        return driverName;
    }

    public String getDriverNationality() {
        return driverNationality;
    }   

    public String getTeamName() {
        return teamName;
    }       
    public int getPoints() {
        return points;
    }       

    public Year getYear() {
        return year;
    }
}

