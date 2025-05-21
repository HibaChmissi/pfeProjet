package com.example.demo.Services;

import com.example.demo.entite.DroitAcces;

import java.util.List;

public interface DroitAccesServices {
    List<DroitAcces> findAll();

    DroitAcces findById(Long id);

    DroitAcces save(DroitAcces droitAcces);

    void delete(Long id);
}