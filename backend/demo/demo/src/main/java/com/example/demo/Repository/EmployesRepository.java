package com.example.demo.Repository;

import com.example.demo.entite.Employes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployesRepository extends JpaRepository<Employes, Long> {
    boolean existsByEmail(String email);

    Employes findEmployesByEmail(String email);
    Optional<Employes> findById(Long id);
}
