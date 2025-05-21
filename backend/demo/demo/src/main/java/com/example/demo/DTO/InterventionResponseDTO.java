package com.example.demo.DTO;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class InterventionResponseDTO {

    private Long id;
    private String titre;
    private String type;
    private String statut;
    private String description;
    private LocalDate date;
    private LocalTime heure;
    private Long createurEmployeId;
    private Long createurTechnicienId;
    private Long traiteurTechnicienId;

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


}
