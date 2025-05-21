package com.example.demo.Services;

import com.example.demo.Repository.AlerteRepository;
import com.example.demo.entite.Alerte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlerteServicesimp implements AlerteServices {

    @Autowired
    private AlerteRepository alerteRepository;

    @Override
    public Alerte ajouterAlerte(Alerte alerte) {
        alerte.setVue(false); // Par défaut, l'alerte est non vue
        return alerteRepository.save(alerte);
    }

    @Override
    public List<Alerte> getToutesAlertes() {
        return alerteRepository.findAll();
    }

    @Override
    public List<Alerte> getAlertesNonVues() {
        return alerteRepository.findByVueFalse();
    }

    @Override
    public Alerte marquerCommeVue(Long id) {
        Alerte alerte = alerteRepository.findById(id).orElse(null);
        if (alerte != null) {
            alerte.setVue(true);
            return alerteRepository.save(alerte);
        }
        return null;
    }

    @Override
    public List<Alerte> getAlertesParNiveau(Alerte.NiveauAlerte niveau) {
        return alerteRepository.findByNiveau(niveau);
    }

    @Override
    public List<Alerte> getAlertesParAdmin(Long adminId) {
        return alerteRepository.findByAdmin_Id(adminId);
    }

}
