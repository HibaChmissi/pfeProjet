package com.example.demo.Services;

import com.example.demo.DTO.InterventionRequestDTO;
import com.example.demo.DTO.InterventionResponseDTO;
import com.example.demo.entite.Employes;
import com.example.demo.entite.Intervention;
import com.example.demo.entite.Technicien;

import java.util.List;

public interface InterventionServices {

    InterventionResponseDTO creerIntervention(InterventionRequestDTO dto);

    InterventionResponseDTO majIntervention(Long id, InterventionRequestDTO dto);

    InterventionResponseDTO traiterIntervention(Long id, String nouveauStatut);

    List<InterventionResponseDTO> consulterInterventionsParEmploye(Long employeId);

    List<InterventionResponseDTO> consulterInterventionsParTechnicien(Long technicienId);

    List<InterventionResponseDTO> consulterToutesLesInterventions();

    Intervention getInterventionById(Long id);

    Intervention saveIntervention(Intervention intervention);

    InterventionResponseDTO consulterInterventionById(Long id);

    InterventionResponseDTO convertToResponseDTO(Intervention intervention);

    Technicien getTechnicienById(Long technicienId);
    Employes getEmployesById(Long employesId);// Assurer que ça retourne Technicien

    List<InterventionResponseDTO> consulterInterventionsCreeesOuTraiteesParTechnicien(Long technicienId);


}