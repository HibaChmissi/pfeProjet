package com.example.demo.entite;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity

public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String etat;

    @OneToMany(mappedBy = "equipement", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<MAJ> misesAJour = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public List<MAJ> getMisesAJour() {
        return misesAJour;
    }

    public void setMisesAJour(List<MAJ> misesAJour) {
        this.misesAJour = misesAJour;
    }
}