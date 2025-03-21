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
@Table(name="drivers")
public class Driver {
    @Id
    private Integer id;
    private String name;
    private String nationality;

    @OneToMany(mappedBy = "driver")
    private List<RaceResults> raceResults;

    @OneToMany(mappedBy = "driver")
    private List<Standing> standings;
    
    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    public Driver() {
    }

    public Driver(Integer id, String name, String nationality) {
        this.id = id;
        this.name = name;
        this.nationality = nationality;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public List<RaceResults> getRaceResults() {
        return raceResults;
    }

    public Team getTeam() {
        return team;
    }

    // public List<Standing> getStandings() {
    //     return standings;
    // }


    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Driver driver)) return false;
        return Objects.equals(getId(), driver.getId()) && Objects.equals(getName(), driver.getName()) && Objects.equals(getNationality(), driver.getNationality());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getNationality());
    }

    @Override
    public String toString() {
        return "Driver{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nationality='" + nationality + '\'' +
                '}';
    }
}
