package com.app.rally.data.dto;

public class RaceResultsDriverVehicleDTO {
    private Integer raceId;
    private String driverName;
    private String driverNationality;
    private String vehicleModel;
    private String vehicleMake;
    private String vehicleYear; 
    private int position;
    private float minutesSeconds;
    private float milliseconds;

    public RaceResultsDriverVehicleDTO() {
    }

    public RaceResultsDriverVehicleDTO(Integer raceId, String driverName, String driverNationality, String vehicleModel, String vehicleMake, String vehicleYear, int position, float minutesSeconds, float milliseconds) {
        this.raceId = raceId;
        this.driverName = driverName;
        this.driverNationality = driverNationality;
        this.vehicleModel = vehicleModel;
        this.vehicleMake = vehicleMake;
        this.vehicleYear = vehicleYear;
        this.position = position;
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

    public String getVehicleModel() {
        return vehicleModel;
    }

    public String getVehicleMake() {
        return vehicleMake;
        }

    public String getVehicleYear() {
        return vehicleYear;
    }

            public int getPosition() {
        return position;
    }

    public float getMinutesSeconds() {
        return minutesSeconds;
    }

    public float getMilliseconds() {
        return milliseconds;
    }
}
