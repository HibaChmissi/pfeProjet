package com.example.demo.Services;
import com.example.demo.entite.Equipement;
import java.util.List;

public interface EquipementServices {
    Equipement ajouterEquipement(Equipement equipement);
    List<Equipement> consulterEquipements();
    Equipement modifierEquipement(Long id, Equipement equipement);
    void supprimerEquipement(Long id);
}
