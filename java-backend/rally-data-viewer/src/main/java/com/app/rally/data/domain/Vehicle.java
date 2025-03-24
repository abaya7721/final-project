package com.app.rally.data.domain;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String model;
    private String make;
    private String year;

    @OneToMany(mappedBy = "vehicle")
    private List<Team> teams;


    public Vehicle() {
    }

    public Vehicle(Integer id, String model, String make, String year) {
        this.id = id;
        this.model = model;
        this.make = make;
        this.year = year;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    // public List<Team> getTeams() {
    //         return teams;
    // }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Vehicle vehicle)) return false;
        return Objects.equals(getId(), vehicle.getId()) && Objects.equals(getModel(), vehicle.getModel()) && Objects.equals(getMake(), vehicle.getMake()) && Objects.equals(getYear(), vehicle.getYear());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getModel(), getMake(), getYear());
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", model='" + model + '\'' +
                ", make='" + make + '\'' +
                ", year='" + year + '\'' +
                '}';
    }
}
