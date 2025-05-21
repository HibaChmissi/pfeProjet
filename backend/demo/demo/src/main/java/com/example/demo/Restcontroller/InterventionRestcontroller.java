package com.example.demo.Restcontroller;

import com.example.demo.DTO.InterventionRequestDTO;
import com.example.demo.DTO.InterventionResponseDTO;
import com.example.demo.DTO.TraitementInterventionDTO;
import com.example.demo.Services.InterventionServices;
import com.example.demo.entite.Intervention;
import com.example.demo.entite.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interventions")
public class InterventionRestcontroller {

    private final InterventionServices interventionServices;

    @Autowired
    public InterventionRestcontroller(InterventionServices interventionServices) {
        this.interventionServices = interventionServices;
    }

    @PostMapping("/create")
    public InterventionResponseDTO creerIntervention(@RequestBody InterventionRequestDTO interventionRequestDTO) {
        return interventionServices.creerIntervention(interventionRequestDTO);
    }

    @GetMapping("/employe/{Id}")
    public List<InterventionResponseDTO> consulterInterventionsParEmploye(@PathVariable("Id") Long employeId) {
        return interventionServices.consulterInterventionsParEmploye(employeId);
    }

    @GetMapping("/technicien/{Id}")
    public List<InterventionResponseDTO> consulterInterventionsParTechnicien(@PathVariable("Id") Long technicienId) {
        return interventionServices.consulterInterventionsCreeesOuTraiteesParTechnicien(technicienId);
    }


    @PutMapping("/update/{id}")
    public InterventionResponseDTO majIntervention(@PathVariable Long id,
                                                   @RequestBody InterventionRequestDTO interventionRequestDTO) {
        return interventionServices.majIntervention(id, interventionRequestDTO);
    }

    @GetMapping("/{id}")
    public InterventionResponseDTO consulterInterventionById(@PathVariable Long id) {
        return interventionServices.consulterInterventionById(id);
    }

    @GetMapping("/all")
    public List<InterventionResponseDTO> consulterToutesLesInterventions() {
        return interventionServices.consulterToutesLesInterventions();
    }

    @PutMapping("/traiter/{id}")
    public InterventionResponseDTO traiterIntervention(@PathVariable Long id,
                                                       @RequestBody TraitementInterventionDTO traitementDTO) {
        // Récupérer l'intervention existante
        Intervention intervention = interventionServices.getInterventionById(id);

        // Mise à jour du statut
        if (traitementDTO.getNouveauStatut() != null && !traitementDTO.getNouveauStatut().isEmpty()) {
            intervention.setStatut(traitementDTO.getNouveauStatut());
        }

        // Affectation du technicien traiteur
        if (traitementDTO.getTraiteurTechnicienId() != null) {
            Technicien technicien = interventionServices.getTechnicienById(traitementDTO.getTraiteurTechnicienId());
            intervention.setTraiteurTechnicien(technicien);
        }

        // Sauvegarde
        Intervention updated = interventionServices.saveIntervention(intervention);
        return interventionServices.convertToResponseDTO(updated);
    }
}