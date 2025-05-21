package com.example.demo.Restcontroller;

import com.example.demo.Services.DroitAccesServices;
import com.example.demo.entite.DroitAcces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/droitsacc")
@CrossOrigin(origins = "https://localhost:4200")
public class DroitAccesRestcontroller {

    @Autowired
    private DroitAccesServices droitAccesServices;

    @GetMapping("/all")
    public List<DroitAcces> getAll() {
        return droitAccesServices.findAll();
    }

    @GetMapping("/{id}")
    public DroitAcces getById(@PathVariable Long id) {
        return droitAccesServices.findById(id);
    }

    @PostMapping("/create")
    public DroitAcces create(@RequestBody DroitAcces droitAcces) {
        return droitAccesServices.save(droitAcces);
    }

    @PutMapping("/{id}")
    public DroitAcces update(@PathVariable Long id, @RequestBody DroitAcces droitAcces) {
        droitAcces.setId(id);
        return droitAccesServices.save(droitAcces);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        droitAccesServices.delete(id);
    }
}