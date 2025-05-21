package com.example.demo.Services;
import com.example.demo.entite.Responsable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public interface ResponsableServices {

    Responsable ajouterResponsable(Responsable responsable_);
    Responsable modifierResponsable(Responsable responsable_, long id);

    Responsable UpdateResponsable(Responsable responsable_, long id);

    Responsable modifierPassword(Responsable responsable_);

    Responsable modifierResponsable1(Responsable responsable_, long id);
    List<Responsable> listResponsable();
    void supprimerResponsable(Long id);
    Optional<Responsable> getResponsableById(Long id);
}