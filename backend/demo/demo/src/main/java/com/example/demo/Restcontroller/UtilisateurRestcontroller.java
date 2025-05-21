package com.example.demo.Restcontroller;
import com.example.demo.Repository.AdminRepository;
import com.example.demo.Repository.EmployesRepository;
import com.example.demo.Repository.ResponsableRepository;
import com.example.demo.Repository.TechnicienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurRestcontroller {
    @Autowired private AdminRepository adminRepository;
    @Autowired private TechnicienRepository technicienRepository;
    @Autowired private EmployesRepository employesRepository;
    @Autowired private ResponsableRepository responsableRepository;

    @GetMapping
    public List<Map<String, Object>> getAllUtilisateurs() {
        List<Map<String, Object>> utilisateurs = new ArrayList<>();

        adminRepository.findAll().forEach(admin -> {
            utilisateurs.add(Map.of(
                    "id", admin.getId(),
                    "nom", admin.getNom(),
                    "role", "Admin"
            ));
        });

        technicienRepository.findAll().forEach(t -> {
            utilisateurs.add(Map.of(
                    "id", t.getId(),
                    "nom", t.getNom(),
                    "role", "Technicien"
            ));
        });

        employesRepository.findAll().forEach(e -> {
            utilisateurs.add(Map.of(
                    "id", e.getId(),
                    "nom", e.getNom(),
                    "role", "Employe"
            ));
        });

        responsableRepository.findAll().forEach(r -> {
            utilisateurs.add(Map.of(
                    "id", r.getId(),
                    "nom", r.getNom(),
                    "role", "Responsable"
            ));
        });

        return utilisateurs;
    }
}
