package com.example.demo.entite;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Employes {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private  long id ;
        private  String nom;
        private String prenom;
        private String email ;
        private String mot_de_passe;
        private String role ;
        private boolean etat ;

}

