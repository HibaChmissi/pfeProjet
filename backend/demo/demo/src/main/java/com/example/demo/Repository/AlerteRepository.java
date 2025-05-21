package com.example.demo.Repository;

import com.example.demo.entite.Alerte;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlerteRepository extends JpaRepository<Alerte, Long> {
    List<Alerte> findByVueFalse();
    List<Alerte> findByNiveau(Alerte.NiveauAlerte niveau);
    List<Alerte> findByAdmin_Id(Long adminId);


}
