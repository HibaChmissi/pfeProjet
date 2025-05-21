package com.example.demo.Services;
import com.example.demo.entite.Technicien;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface TechnicienServices {

    Technicien ajouterTechnicien(Technicien technicien);
    Technicien modifierTechnicien(Technicien technicien, long id);

    Technicien UpdateTechnicien(Technicien technicien, long id);

    Technicien modifierPassword(Technicien technicien);

    Technicien modifierTechnicien1(Technicien technicien, long id);
    List<Technicien> listTechnicien();
    void supprimerTechnicien(Long id);
    Optional<Technicien> getTechnicienById(Long id);
}