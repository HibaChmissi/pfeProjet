package com.example.demo.Services;
import com.example.demo.entite.Alerte;
import java.util.List;

public interface AlerteServices {
    Alerte ajouterAlerte(Alerte alerte);
    List<Alerte> getToutesAlertes();
    List<Alerte> getAlertesNonVues();
    Alerte marquerCommeVue(Long id);
    List<Alerte> getAlertesParNiveau(Alerte.NiveauAlerte niveau);
    List<Alerte> getAlertesParAdmin(Long adminId);

}
