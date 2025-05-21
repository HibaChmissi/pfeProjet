package com.example.demo.Restcontroller;
import com.example.demo.Services.EquipementServices;
import com.example.demo.entite.Equipement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipements")
public class EquipementRestcontroller {
    @Autowired
    private EquipementServices equipementService;

    @PostMapping
    public ResponseEntity<Equipement> ajouter(@RequestBody Equipement equipement) {
        return ResponseEntity.ok(equipementService.ajouterEquipement(equipement));
    }

    @GetMapping
    public List<Equipement> consulter() {
        return equipementService.consulterEquipements();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipement> modifier(@PathVariable Long id, @RequestBody Equipement e) {
        return ResponseEntity.ok(equipementService.modifierEquipement(id, e));
    }

    @DeleteMapping("/{id}")
    public void supprimer(@PathVariable Long id) {
        equipementService.supprimerEquipement(id);
    }

    
}
