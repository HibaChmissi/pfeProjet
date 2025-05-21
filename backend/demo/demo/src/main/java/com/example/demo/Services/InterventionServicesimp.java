package com.example.demo.Services;

import com.example.demo.DTO.InterventionRequestDTO;
import com.example.demo.DTO.InterventionResponseDTO;
import com.example.demo.DTO.TraitementInterventionDTO;
import com.example.demo.Repository.EmployesRepository;
import com.example.demo.Repository.InterventionRepository;
import com.example.demo.Repository.TechnicienRepository;
import com.example.demo.entite.Employes;
import com.example.demo.entite.Intervention;
import com.example.demo.entite.Technicien;
import com.example.demo.InterventionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterventionServicesimp implements InterventionServices {

    @Autowired
    private InterventionRepository interventionRepository;

    @Autowired
    private EmployesRepository employesRepository;

    @Autowired
    private TechnicienRepository technicienRepository;

    @Override
    public InterventionResponseDTO creerIntervention(InterventionRequestDTO dto) {
        Intervention intervention = new Intervention();
        intervention.setTitre(dto.getTitre());
        intervention.setType(dto.getType());
        intervention.setDescription(dto.getDescription());

        intervention.setDate(dto.getDate() == null ? LocalDate.now() : dto.getDate());
        intervention.setHeure(dto.getHeure() == null ? LocalTime.now() : dto.getHeure());

        String statut = dto.getNouveauStatut();
        if (statut == null || statut.isEmpty()) {
            statut = "En attente";
        }
        intervention.setStatut(statut);



        // Gestion du créateur
        if (dto.getCreateurEmployeId() != null) {
            Employes employes = employesRepository.findById(dto.getCreateurEmployeId())
                    .orElseThrow(() -> new RuntimeException("Employé introuvable (créateur)"));
            intervention.setCreateurEmployes(employes);
        } else if (dto.getCreateurTechnicienId() != null) {
            Technicien technicien = technicienRepository.findById(dto.getCreateurTechnicienId())
                    .orElseThrow(() -> new RuntimeException("Technicien introuvable (créateur)"));
            intervention.setCreateurTechnicien(technicien);
        } else {
            throw new RuntimeException("Aucun créateur spécifié (ni employé ni technicien)");
        }

        // Gestion du traiteur
        if (dto.getTraiteurTechnicienId() != null) {
            Technicien technicienTraiteur = technicienRepository.findById(dto.getTraiteurTechnicienId())
                    .orElseThrow(() -> new RuntimeException("Technicien traiteur introuvable"));
            intervention.setTraiteurTechnicien(technicienTraiteur);
        }

        Intervention saved = interventionRepository.save(intervention);
        return convertToResponseDTO(saved);
    }

    @Override
    public InterventionResponseDTO majIntervention(Long id, InterventionRequestDTO dto) {
        Intervention intervention = getInterventionById(id);
        intervention.setTitre(dto.getTitre());
        intervention.setType(dto.getType());
        intervention.setDescription(dto.getDescription());
        intervention.setDate(dto.getDate() == null ? LocalDate.now() : dto.getDate());
        intervention.setHeure(dto.getHeure() == null ? LocalTime.now() : dto.getHeure());

        Intervention updated = interventionRepository.save(intervention);
        return convertToResponseDTO(updated);
    }

    @Override
    public InterventionResponseDTO traiterIntervention(Long id, String nouveauStatut) {
        Intervention intervention = getInterventionById(id);
        intervention.setStatut(nouveauStatut);
        interventionRepository.save(intervention);
        return convertToResponseDTO(intervention);
    }

    @Override
    public List<InterventionResponseDTO> consulterInterventionsParEmploye(Long employeId) {
        Employes employes = employesRepository.findById(employeId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable"));
        return interventionRepository.findByCreateurEmployes(employes)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InterventionResponseDTO> consulterInterventionsParTechnicien(Long technicienId) {
        Technicien technicien = technicienRepository.findById(technicienId)
                .orElseThrow(() -> new RuntimeException("Technicien introuvable"));
        return interventionRepository.findByTraiteurTechnicien(technicien)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InterventionResponseDTO> consulterToutesLesInterventions() {
        return interventionRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Intervention getInterventionById(Long id) {
        return interventionRepository.findById(id)
                .orElseThrow(() -> new InterventionNotFoundException(id));
    }

    @Override
    public Intervention saveIntervention(Intervention intervention) {
        return interventionRepository.save(intervention);
    }

    @Override
    public InterventionResponseDTO consulterInterventionById(Long id) {
        Intervention intervention = getInterventionById(id);
        return convertToResponseDTO(intervention);
    }

    @Override
    public InterventionResponseDTO convertToResponseDTO(Intervention intervention) {
        InterventionResponseDTO dto = new InterventionResponseDTO();
        dto.setId(intervention.getId());
        dto.setTitre(intervention.getTitre());
        dto.setType(intervention.getType());
        dto.setDescription(intervention.getDescription());
        dto.setDate(intervention.getDate());
        dto.setHeure(intervention.getHeure());
        dto.setStatut(intervention.getStatut());

        dto.setCreateurEmployeId(
                intervention.getCreateurEmployes() != null ? intervention.getCreateurEmployes().getId() : null);
        dto.setCreateurTechnicienId(
                intervention.getCreateurTechnicien() != null ? intervention.getCreateurTechnicien().getId() : null);
        dto.setTraiteurTechnicienId(
                intervention.getTraiteurTechnicien() != null ? intervention.getTraiteurTechnicien().getId() : null);

        return dto;
    }

    @Override
    public Technicien getTechnicienById(Long technicienId) {
        return technicienRepository.findById(technicienId)
                .orElseThrow(() -> new RuntimeException("Technicien introuvable"));
    }

    @Override
    public Employes getEmployesById(Long employesId) {
        return employesRepository.findById(employesId)
                .orElseThrow(() -> new RuntimeException("Employé introuvable"));
    }

    @Override
    public List<InterventionResponseDTO> consulterInterventionsCreeesOuTraiteesParTechnicien(Long technicienId) {
        Technicien technicien = technicienRepository.findById(technicienId)
                .orElseThrow(() -> new RuntimeException("Technicien introuvable"));

        List<Intervention> creees = interventionRepository.findByCreateurTechnicien(technicien);
        List<Intervention> traitee = interventionRepository.findByTraiteurTechnicien(technicien);

        // Fusionner les deux listes sans doublons
        List<Intervention> toutes = creees;
        for (Intervention i : traitee) {
            if (!toutes.contains(i)) {
                toutes.add(i);
            }
        }

        return toutes.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

}