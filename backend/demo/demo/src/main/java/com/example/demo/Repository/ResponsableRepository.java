package com.example.demo.Repository;
import com.example.demo.entite.Responsable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsableRepository extends JpaRepository<Responsable, Long> {

    boolean existsByEmail(String email);

    Responsable findResponsableByEmail(String email);
}