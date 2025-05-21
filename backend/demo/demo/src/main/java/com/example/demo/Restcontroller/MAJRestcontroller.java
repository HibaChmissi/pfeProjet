package com.example.demo.Restcontroller;

import com.example.demo.Repository.AdminRepository;
import com.example.demo.Services.MAJServices;
import com.example.demo.entite.Admin;
import com.example.demo.entite.MAJ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/maj")
public class MAJRestcontroller {

    @Autowired
    private MAJServices majService;

    @Autowired
    private AdminRepository adminRepository;  // Injection du repository

    @PostMapping("/automatiser")
    public ResponseEntity<MAJ> automatiserMAJ(@RequestBody Map<String, Object> request) {
        Long equipementId = Long.valueOf(request.get("equipementId").toString());
        String description = request.get("description").toString();
        Long adminId = Long.valueOf(request.get("adminId").toString());

        // Utilisation de l'instance injectée, pas la classe AdminRepository
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin non trouvé"));

        return ResponseEntity.ok(majService.automatiserMAJ(equipementId, description, admin));
    }


    @GetMapping
    public List<MAJ> consulter() {
        return majService.consulterMAJ();
    }

    @GetMapping("/equipements/{equipementId}")
    public ResponseEntity<List<MAJ>> getMajsByEquipement(@PathVariable Long equipementId) {
        List<MAJ> majList = majService.getMajsByEquipement(equipementId);
        return ResponseEntity.ok(majList);
    }

}