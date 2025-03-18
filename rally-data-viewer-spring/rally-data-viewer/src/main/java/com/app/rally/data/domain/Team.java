package com.app.rally.data.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name="teams")
public class Team {

    @Id
    Integer id;
    String teamName;
    String sponsor;

    public Team() {
    }

    public Team(Integer id, String teamName, String sponsor) {
        this.id = id;
        this.teamName = teamName;
        this.sponsor = sponsor;
    }

    public String getSponsor() {
        return sponsor;
    }

    public void setSponsor(String sponsor) {
        this.sponsor = sponsor;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Team team)) return false;
        return Objects.equals(id, team.id) && Objects.equals(getTeamName(), team.getTeamName()) && Objects.equals(getSponsor(), team.getSponsor());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, getTeamName(), getSponsor());
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", teamName='" + teamName + '\'' +
                ", sponsor='" + sponsor + '\'' +
                '}';
    }
}
