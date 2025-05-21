package com.example.demo.Services;

import com.example.demo.Repository.EquipementRepository;
import com.example.demo.entite.Equipement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipementServicesimp implements EquipementServices {
    @Autowired
    private EquipementRepository equipementRepository;

    @Override
    public Equipement ajouterEquipement(Equipement equipement) {
        return equipementRepository.save(equipement);
    }

    @Override
    public List<Equipement> consulterEquipements() {
        return equipementRepository.findAll();
    }

    @Override
    public Equipement modifierEquipement(Long id, Equipement newData) {
        Equipement equipement = equipementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Équipement non trouvé"));
        equipement.setNom(newData.getNom());
        equipement.setEtat(newData.getEtat());
        return equipementRepository.save(equipement);
    }

    @Override
    public void supprimerEquipement(Long id) {
        equipementRepository.deleteById(id);
    }
}
