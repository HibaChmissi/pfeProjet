package com.example.demo.Services;
import com.example.demo.Repository.TechnicienRepository;
import com.example.demo.entite.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TechnicienServicesimp implements TechnicienServices {

    @Autowired
    TechnicienRepository technicienRepository;

    public Technicien ajouterTechnicien(Technicien technicien) {

        return technicienRepository.save(technicien);
    }


    public Technicien modifierTechnicien(Technicien technicien, long id) {
        return technicienRepository.save(technicien);
    }


    public Technicien UpdateTechnicien(Technicien technicien, long id) {
        return technicienRepository.save(technicien);
    }


    public Technicien modifierPassword(Technicien technicien) {
        return technicienRepository.save(technicien);
    }


    public Technicien modifierTechnicien1(Technicien technicien, long id) {
        return null;
    }


    public List<Technicien> listTechnicien() {
        return technicienRepository.findAll();
    }


    public void supprimerTechnicien(Long id) {
        technicienRepository.deleteById(id);
    }


    public Optional<Technicien> getTechnicienById(Long id) {
        return technicienRepository.findById(id);
    }
}