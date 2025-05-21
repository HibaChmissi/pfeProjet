package com.example.demo.Services;
import com.example.demo.Repository.EquipementRepository;
import com.example.demo.Repository.MAJRepository;
import com.example.demo.entite.Admin;
import com.example.demo.entite.Equipement;
import com.example.demo.entite.MAJ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MAJServicesimp implements MAJServices {
    @Autowired
    private MAJRepository majRepository ;

    @Autowired
    private EquipementRepository equipementRepository;

    @Override
    public MAJ automatiserMAJ(Long equipementId, String description, Admin admin) {
        Equipement equipement = equipementRepository.findById(equipementId)
                .orElseThrow(() -> new RuntimeException("Équipement non trouvé"));

        MAJ maj = new MAJ();
        maj.setEquipement(equipement);
        maj.setDescription(description);
        maj.setDate(LocalDateTime.now());
        maj.setAdmin(admin);
        return majRepository.save(maj);
    }

    @Override
    public List<MAJ> consulterMAJ() {
        return majRepository.findAll();
    }
    @Override
    public List<MAJ> getMajsByEquipement(Long equipementId) {
        return majRepository.findByEquipementId(equipementId);
    }

}
