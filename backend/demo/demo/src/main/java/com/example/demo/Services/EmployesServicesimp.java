package com.example.demo.Services;

import com.example.demo.Repository.EmployesRepository;
import com.example.demo.entite.Employes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployesServicesimp implements EmployesServices {

    @Autowired
    private EmployesRepository employesRepository;

    @Override
    public Employes ajouterEmployes(Employes employes) {
        return employesRepository.save(employes);
    }

    @Override
    public Employes modifierEmployes(Employes employes) {
        return employesRepository.save(employes);
    }

    @Override
    public List<Employes> listEmployes() {
        return employesRepository.findAll();
    }

    @Override
    public void supprimerEmployes(Long id) {
        employesRepository.deleteById(id);
    }

    @Override
    public Optional<Employes> getEmployesById(Long id) {
        return employesRepository.findById(id);
    }
}