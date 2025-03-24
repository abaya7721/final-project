package com.app.rally.data.domain;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="teams")
public class Team { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "team_name")
    String teamName;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle ;

    public Team() {
    }

    public Team(Integer id, String name) {
        this.id = id;
        this.teamName = name;
    }


    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String name) {
        this.teamName = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    // public Vehicle getVehicle() {
    //     return vehicle;
    // }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    // public List<Driver> getDrivers() {
    //     return drivers;
    // }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Team team)) return false;
        return Objects.equals(id, team.id) && Objects.equals(getTeamName(), team.getTeamName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, getTeamName());
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", teamName='" + teamName + '\'' +
                '}';
    }
}
