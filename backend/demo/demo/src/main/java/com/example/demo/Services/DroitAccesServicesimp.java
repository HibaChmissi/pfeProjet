package com.example.demo.Services;

import com.example.demo.entite.DroitAcces;
import com.example.demo.Repository.DroitAccesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DroitAccesServicesimp implements DroitAccesServices {

    @Autowired
    private DroitAccesRepository repository;

    @Override
    public List<DroitAcces> findAll() {
        return repository.findAll();
    }

    @Override
    public DroitAcces findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public DroitAcces save(DroitAcces droitAcces) {
        return repository.save(droitAcces);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}