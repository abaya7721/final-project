package com.app.rally.data.domain;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="teams")
public class Team {

    @Id
    Integer id;
    String teamName;

    @OneToMany(mappedBy = "team")
    private List<Driver> drivers;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle ;

    public Team() {
    }

    public Team(Integer id, String teamName) {
        this.id = id;
        this.teamName = teamName;
    }

    public String getTeamName() {
        return teamName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    // public List<Driver> getDrivers() {
    //     return drivers;
    // }

    public Vehicle getVehicle() {
        return vehicle;
    }

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
