package com.example.demo.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class InterventionRequestDTO {

    private String titre;
    private String description;
    private String type; // INCIDENT ou DEMANDE_SERVICE
    private String statut;
    private String nouveauStatut;
    private LocalDate date;
    private LocalTime heure;

    private Long createurEmployeId;         // ID de l'employé créateur
    private Long createurTechnicienId;       // ID du technicien créateur
    private Long traiteurTechnicienId;       // ID du technicien qui traite l'intervention

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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


    public Long getCreateurEmployeId() {
        return createurEmployeId;
    }

    public void setCreateurEmployeId(Long createurEmployeId) {
        this.createurEmployeId = createurEmployeId;
    }

    public Long getCreateurTechnicienId() {
        return createurTechnicienId;
    }

    public void setCreateurTechnicienId(Long createurTechnicienId) {
        this.createurTechnicienId = createurTechnicienId;
    }

    public Long getTraiteurTechnicienId() {
        return traiteurTechnicienId;
    }

    public void setTraiteurTechnicienId(Long traiteurTechnicienId) {
        this.traiteurTechnicienId = traiteurTechnicienId;
    }

    public String getNouveauStatut() {
        return nouveauStatut;
    }

    public void setNouveauStatut(String nouveauStatut) {
        this.nouveauStatut = nouveauStatut;
    }
}
