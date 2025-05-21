package com.example.demo.Services;
import com.example.demo.Repository.ResponsableRepository;
import com.example.demo.entite.Responsable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public  class ResponsableServicesimp implements ResponsableServices{

    @Autowired
    ResponsableRepository responsableRepository;

    public Responsable ajouterResponsable(Responsable responsable_) {

        return responsableRepository.save(responsable_);
    }

    public Responsable modifierResponsable(Responsable responsable_, long id) {
        return responsableRepository.save(responsable_);
    }


    public Responsable UpdateResponsable(Responsable responsable_, long id) {
        return responsableRepository.save(responsable_);
    }


    public Responsable modifierPassword(Responsable responsable_) {
        return responsableRepository.save(responsable_);
    }


    public Responsable modifierResponsable1(Responsable responsable_, long id) {
        return null;
    }


    public List<Responsable> listResponsable() {
        return responsableRepository.findAll();
    }


    public void supprimerResponsable(Long id) {
        responsableRepository.deleteById(id);
    }


    public Optional<Responsable> getResponsableById(Long id) {
        return responsableRepository.findById(id);
    }
}