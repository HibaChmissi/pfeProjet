package com.example.demo.entite;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Alerte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // <-- Ceci est la clé primaire unique

    @ManyToOne
    @JoinColumn(name = "admin_id") // clé étrangère vers Admin
    private Admin admin;

    private String type;
    private String message;

    @Enumerated(EnumType.STRING)
    private NiveauAlerte niveau;

    private boolean vue = false;

    private LocalDateTime dateHeure;

    public enum NiveauAlerte {
        INFO,
        WARNING,
        CRITIQUE
    }

    @PrePersist
    public void prePersist() {
        dateHeure = LocalDateTime.now();
    }

    // Getters et setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Admin getAdmin() { return admin; }
    public void setAdmin(Admin admin) { this.admin = admin; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public NiveauAlerte getNiveau() { return niveau; }
    public void setNiveau(NiveauAlerte niveau) { this.niveau = niveau; }

    public boolean isVue() { return vue; }
    public void setVue(boolean vue) { this.vue = vue; }

    public LocalDateTime getDateHeure() { return dateHeure; }
    public void setDateHeure(LocalDateTime dateHeure) { this.dateHeure = dateHeure; }
}
