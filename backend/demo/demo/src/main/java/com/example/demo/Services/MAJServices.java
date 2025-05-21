package com.example.demo.Services;

import com.example.demo.Repository.MAJRepository;
import com.example.demo.entite.Admin;
import com.example.demo.entite.MAJ;

import java.util.List;

public interface MAJServices {
    MAJ automatiserMAJ(Long equipementId, String description, Admin admin);

    List<MAJ> consulterMAJ();
    List<MAJ> getMajsByEquipement(Long equipementId);


}