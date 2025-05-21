package com.example.demo.entite;

import jakarta.persistence.*;

@Entity
@Table(name = "droit_acces")
public class DroitAcces {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;
    private String ressource;
    private boolean voir;
    private boolean creer;
    private boolean modifier;
    private boolean supprimer;
    private boolean traiter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRessource() {
        return ressource;
    }

    public void setRessource(String ressource) {
        this.ressource = ressource;
    }

    public boolean isVoir() {
        return voir;
    }

    public void setVoir(boolean voir) {
        this.voir = voir;
    }

    public boolean isCreer() {
        return creer;
    }

    public void setCreer(boolean creer) {
        this.creer = creer;
    }

    public boolean isModifier() {
        return modifier;
    }

    public void setModifier(boolean modifier) {
        this.modifier = modifier;
    }

    public boolean isSupprimer() {
        return supprimer;
    }

    public void setSupprimer(boolean supprimer) {
        this.supprimer = supprimer;
    }

    public boolean isTraiter() {
        return traiter;
    }

    public void setTraiter(boolean traiter) {
        this.traiter = traiter;
    }
}