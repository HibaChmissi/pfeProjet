package com.example.demo;

public class InterventionNotFoundException extends RuntimeException {
    // Constructeur de l'exception qui prend l'ID de l'intervention en paramètre
    public InterventionNotFoundException(Long id) {
        super("Intervention avec ID " + id + " non trouvée.");

    }
}
