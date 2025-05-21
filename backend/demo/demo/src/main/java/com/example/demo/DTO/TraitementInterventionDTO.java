package com.example.demo.DTO;

public class TraitementInterventionDTO {
    private String nouveauStatut;
    private Long traiteurTechnicienId;

    public String getNouveauStatut() {
        return nouveauStatut;
    }

    public void setNouveauStatut(String nouveauStatut) {
        this.nouveauStatut = nouveauStatut;
    }

    public Long getTraiteurTechnicienId() {
        return traiteurTechnicienId;
    }

    public void setTraiteurTechnicienId(Long traiteurTechnicienId) {
        this.traiteurTechnicienId = traiteurTechnicienId;
    }
}
