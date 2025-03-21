package com.app.rally.data.domain;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "regions")
public class Region {

    @Id
    private Integer id;
    private String country;
    private String Region;

    @OneToMany(mappedBy = "region")
    private List<Event> events;

    public Region() {
    }

    public Region(Integer id, String country, String region) {
        this.id = id;
        this.country = country;
        Region = region;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return Region;
    }

    public void setRegion(String region) {
        Region = region;
    }

    // public List<Event> getEvents() {
    //     return events;
    // }
    
    

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Region region)) return false;
        return Objects.equals(getId(), region.getId()) && Objects.equals(getCountry(), region.getCountry()) && Objects.equals(getRegion(), region.getRegion());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCountry(), getRegion());
    }

    @Override
    public String toString() {
        return "Region{" +
                "id=" + id +
                ", country='" + country + '\'' +
                ", Region='" + Region + '\'' +
                '}';
    }
}
