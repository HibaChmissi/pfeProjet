package com.example.demo.Restcontroller;
import com.example.demo.Repository.EmployesRepository;
import com.example.demo.Services.EmailServices;
import com.example.demo.Services.EmployesServices;
import com.example.demo.Services.RestPasswordServicesimp;
import com.example.demo.entite.Employes;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "https://localhost:4200" , allowCredentials = "true")
@RequestMapping(value = "/employe")
public class EmployesRestcontroller {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    EmployesRepository employesRepository;

    @Autowired
    private EmployesServices employesServices;

    //  Ajouter un employes
    @PostMapping
    public ResponseEntity<?> AjouterEmployes(@RequestBody Employes employes) {
        if (employesRepository.existsByEmail(employes.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email existe déjà !"));
        }

        employes.setMot_de_passe(this.bCryptPasswordEncoder.encode(employes.getMot_de_passe()));
        Employes savedUser = employesRepository.save(employes);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    //  Modifier un employes
    @PutMapping("/{id}")
    public ResponseEntity<?> modifieremployes(@PathVariable Long id, @RequestBody Employes employe) {
        Optional<Employes> employeOpt = employesRepository.findById(id);

        if (employeOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employé non trouvé !");
        }

        employe.setId(id); // S'assurer que l'ID reste le même
        employe.setMot_de_passe(this.bCryptPasswordEncoder.encode(employe.getMot_de_passe()));
        Employes updatedEmploye = employesRepository.save(employe);
        return ResponseEntity.ok(updatedEmploye);
    }

    //  Supprimer un employes
    @DeleteMapping("/{id}")
    public ResponseEntity<?> suppEmployes(@PathVariable Long id) {
        if (!employesRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employé non trouvé !");
        }

        employesServices.supprimerEmployes(id);
        return ResponseEntity.ok("Employé supprimé avec succès !");
    }

    //  Afficher tous les employes
    @GetMapping
    public List<Employes> afficherEmployes() {
        return employesServices.listEmployes();
    }

    //  Afficher un employes par ID
    @GetMapping("/{id}")
    public ResponseEntity<Employes> getEmployesById(@PathVariable Long id) {
        Optional<Employes> employes = employesRepository.findById(id);
        return employes.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    //  Vérification du statut et connexion
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginEmployes(@RequestBody Employes employes) {
        Map<String, Object> response = new HashMap<>();

        Employes userFromDB = employesRepository.findEmployesByEmail(employes.getEmail());

        if (userFromDB == null) {
            response.put("message", "Employé non trouvé !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        //  Vérifier si le compte est désactivé
        if (!userFromDB.isEtat()) {
            response.put("message", "Compte désactivé. Contactez l'administrateur !");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        boolean compare = this.bCryptPasswordEncoder.matches(employes.getMot_de_passe(), userFromDB.getMot_de_passe());

        if (!compare) {
            response.put("message", "Mot de passe incorrect !");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        //  Générer le token JWT
        String token = Jwts.builder()
                .claim("id", userFromDB.getId())
                .claim("email", userFromDB.getEmail())
                .claim("role", userFromDB.getRole())
                .signWith(SignatureAlgorithm.HS256, "SECRET")
                .compact();


        response.put("token", token);
        response.put("role", userFromDB.getRole());

        return ResponseEntity.ok(response);
    }

    //  Changer le statut d'un employé (activer/désactiver)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long id) {
        Optional<Employes> employeOpt = employesRepository.findById(id);

        if (employeOpt.isPresent()) {
            Employes employes = employeOpt.get();
            employes.setEtat(!employes.isEtat()); //  Inverser l'etat
            employesRepository.save(employes);

            return ResponseEntity.ok(Map.of(
                    "message", "Statut changé avec succès !",
                    "newStatus", employes.isEtat()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Employé non trouvé !"));
        }
    }

    @GetMapping("/{id}/etat")
    public ResponseEntity<?> consulterEtatCompte(@PathVariable Long id) {
        Optional<Employes> employesOpt = employesRepository.findById(id);

        if (employesOpt.isPresent()) {
            Employes employe = employesOpt.get();
            return ResponseEntity.ok(Map.of(
                    "message", "Consultation réussie",
                    "etat", employe.isEtat() ? "Actif" : "Désactivé"
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Employé non trouvé !"));
        }
    }


    @Autowired
    EmailServices emailService;
    @Autowired
    RestPasswordServicesimp restPasswordServices;
    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<Employes> modifierEmploye(@PathVariable("id") Long id, @RequestBody Employes employe) {
        return employesRepository.findById(id).map(existingEmploye -> {
            existingEmploye.setNom(employe.getNom());
            existingEmploye.setPrenom(employe.getPrenom());
            existingEmploye.setEmail(employe.getEmail());

            employesRepository.save(existingEmploye);
            return ResponseEntity.ok(existingEmploye);
        }).orElse(ResponseEntity.notFound().build());
    }
    @PostMapping("/checkOldPassword/{id}")
    public ResponseEntity<Boolean> checkOldPassword(@PathVariable("id") Long id, @RequestBody Map<String, String> passwordMap) {
        String oldPassword = passwordMap.get("oldPassword");
        return employesRepository.findById(id).map(existingEmploye -> {
            boolean isMatch = bCryptPasswordEncoder.matches(oldPassword, existingEmploye.getMot_de_passe());
            return ResponseEntity.ok(isMatch);
        }).orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Employes> modifierPassword(@PathVariable("id") Long id, @RequestBody Employes employe) {
        return employesRepository.findById(id).map(existingEmployes -> {
            existingEmployes.setMot_de_passe(bCryptPasswordEncoder.encode(employe.getMot_de_passe()));
            employesRepository.save(existingEmployes);
            return ResponseEntity.ok(existingEmployes);
        }).orElse(ResponseEntity.notFound().build());
    }
    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdp(@RequestBody Employes employes) {
        Employes userFromDB = employesRepository.findEmployesByEmail(employes.getEmail());
        if (userFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilisateur non trouvé");
        } else {
            String nvmdp = restPasswordServices.nvMdp();
            userFromDB.setMot_de_passe(bCryptPasswordEncoder.encode(nvmdp));
            employesRepository.save(userFromDB);
            userFromDB.setEtat(true);
            emailService.SendSimpleMessage(
                    userFromDB.getEmail(),

                    "Votre nouveau mot de passe",
                    "Bonjour,\nVotre mot de passe sur Sagemcom a été réinitialisé : " + nvmdp
            );

            return ResponseEntity.status(HttpStatus.OK).body("Instructions envoyées");
        }
    }
    @Autowired
    private EmailServices emailServices;

    @PostMapping("/test-email")
    public ResponseEntity<String> testEmail(@RequestParam String email) {
        try {
            emailServices.emailSender (email, "Test Email", "Ceci est un test d'envoi d'email depuis Spring Boot.");
            return ResponseEntity.ok("Email envoyé avec succès à " + email);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'envoi de l'email : " + e.getMessage());
        }
    }


}