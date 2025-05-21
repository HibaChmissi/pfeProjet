package com.example.demo.Repository;
import com.example.demo.entite.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TechnicienRepository extends JpaRepository<Technicien,Long> {
    boolean existsByEmail(String email);

    Technicien findTechnicienByEmail(String email);

}