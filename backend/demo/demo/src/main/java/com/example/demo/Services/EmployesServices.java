package com.example.demo.Services;

import com.example.demo.entite.Employes;

import java.util.List;
import java.util.Optional;

public interface EmployesServices {
    Employes ajouterEmployes(Employes employes);
    Employes modifierEmployes(Employes employes);
    List <Employes> listEmployes();
    void supprimerEmployes(Long id);
     Optional <Employes> getEmployesById(Long id);
}
