package com.example.demo.Repository;

import com.example.demo.entite.MAJ;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MAJRepository extends JpaRepository<MAJ, Long> {
    List<MAJ> findByEquipementId(Long equipementId);
}

