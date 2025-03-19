package com.app.rally.data.domain;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="drivers")
public class Driver {
    @Id
    private Integer id;
    private String name;
    private String nationality;

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
