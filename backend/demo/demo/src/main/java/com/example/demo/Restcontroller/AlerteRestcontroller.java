package com.example.demo.Restcontroller;

import com.example.demo.Services.AlerteServices;
import com.example.demo.entite.Alerte;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alertes")
@CrossOrigin(origins = "http://localhost:4200")
public class AlerteRestcontroller {

    @Autowired
    private AlerteServices alerteServices;

    @PostMapping
    public Alerte ajouterAlerte(@RequestBody Alerte alerte) {
        return alerteServices.ajouterAlerte(alerte);
    }

    @GetMapping
    public List<Alerte> getToutesAlertes() {
        return alerteServices.getToutesAlertes();
    }

    @GetMapping("/nonvues")
    public List<Alerte> getAlertesNonVues() {
        return alerteServices.getAlertesNonVues();
    }

    @PostMapping("/{id}/vue")
    public Alerte marquerCommeVue(@PathVariable Long id) {
        return alerteServices.marquerCommeVue(id);
    }
    @GetMapping("/niveau/{niveau}")
    public List<Alerte> getAlertesParNiveau(@PathVariable Alerte.NiveauAlerte niveau) {
        return alerteServices.getAlertesParNiveau(niveau);
    }
    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Alerte>> getAlertesParAdmin(@PathVariable Long adminId) {
        return ResponseEntity.ok(alerteServices.getAlertesParAdmin(adminId));
    }



}
