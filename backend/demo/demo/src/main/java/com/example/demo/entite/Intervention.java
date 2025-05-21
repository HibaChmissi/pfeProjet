package com.example.demo.entite;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String type;
    private String statut;
    private String description;
    private LocalDate date;
    private LocalTime heure;

    // Relation ManyToOne avec Employe (Créateur de l'intervention)
    @ManyToOne
    @JoinColumn(name = "createur_employe_id")
    private Employes createurEmployes;

    // Relation ManyToOne avec Technicien (Créateur de l'intervention)
    @ManyToOne
    @JoinColumn(name = "createur_technicien_id")
    private Technicien createurTechnicien;

    // Relation ManyToOne avec Technicien (Technicien traitant)
    @ManyToOne
    @JoinColumn(name = "traiteur_technicien_id")
    private Technicien traiteurTechnicien;

    // Constructeur vide requis par JPA
    public Intervention() {}

    // Constructeur utilisé pour initialiser l'intervention avec certains paramètres
    public Intervention(String titre, String type, String statut, String description,
                        LocalDate date, LocalTime heure, Employes createurEmployes,
                        Technicien createurTechnicien, Technicien traiteurTechnicien) {
        this.titre = titre;
        this.type = type;
        this.statut = statut;
        this.description = description;
        this.date = date;
        this.heure = heure;
        this.createurEmployes = createurEmployes;
        this.createurTechnicien = createurTechnicien;
        this.traiteurTechnicien = traiteurTechnicien;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHeure() {
        return heure;
    }

    public void setHeure(LocalTime heure) {
        this.heure = heure;
    }

    public Employes getCreateurEmployes() {
        return createurEmployes;
    }

    public void setCreateurEmployes(Employes createurEmployes) {
        this.createurEmployes = createurEmployes;
    }

    public Technicien getCreateurTechnicien() {
        return createurTechnicien;
    }

    public void setCreateurTechnicien(Technicien createurTechnicien) {
        this.createurTechnicien = createurTechnicien;
    }

    public Technicien getTraiteurTechnicien() {
        return traiteurTechnicien;
    }

    public void setTraiteurTechnicien(Technicien traiteurTechnicien) {
        this.traiteurTechnicien = traiteurTechnicien;
    }
}
