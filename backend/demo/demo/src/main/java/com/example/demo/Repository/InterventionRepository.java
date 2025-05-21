package com.example.demo.Repository;

import com.example.demo.entite.Employes;
import com.example.demo.entite.Intervention;
import com.example.demo.entite.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InterventionRepository extends JpaRepository<Intervention, Long> {

    // Rechercher par créateur employé
    List<Intervention> findByCreateurEmployes(Employes createurEmployes);

    // Rechercher par technicien traitant
    List<Intervention> findByTraiteurTechnicien(Technicien traiteurTechnicien);
    List<Intervention> findByCreateurTechnicien(Technicien technicien);

    // Rechercher par créateur employé ou technicien traitant
    List<Intervention> findByCreateurEmployesOrTraiteurTechnicien(Employes createurEmployes, Technicien traiteurTechnicien);




    // Optionnel : utiliser une requête personnalisée si nécessaire
    @Query("SELECT i FROM Intervention i WHERE i.createurEmployes = :createurEmployes OR i.traiteurTechnicien = :traiteurTechnicien")
    List<Intervention> findByCreateurEmployesOrTraiteurTechnicienCustom(Employes createurEmployes, Technicien traiteurTechnicien);
}