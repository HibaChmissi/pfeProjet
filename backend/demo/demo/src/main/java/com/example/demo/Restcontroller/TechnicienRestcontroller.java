package com.example.demo.Restcontroller;

import com.example.demo.Services.RestPasswordServicesimp;
import com.example.demo.entite.Technicien;
import com.example.demo.Repository.TechnicienRepository;
import com.example.demo.Services.EmailServices;
import com.example.demo.Services.TechnicienServices;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/technicien")
public class TechnicienRestcontroller {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    TechnicienRepository technicienRepository;

    @Autowired
    EmailServices emailService;

    @Autowired
    TechnicienServices technicienServices;

    // ✅ Création d'un technicien (avec encodage du mot de passe + vérification email unique)
    @PostMapping
    public ResponseEntity<?> ajouterTechnicien(@RequestBody Technicien technicien) {
        HashMap<String, Object> response = new HashMap<>();

        if (technicienRepository.existsByEmail(technicien.getEmail())) {
            response.put("message", "Email existe déjà !");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        technicien.setMot_de_passe(bCryptPasswordEncoder.encode(technicien.getMot_de_passe()));
        Technicien savedUser = technicienServices.ajouterTechnicien(technicien);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technicien> modifierTechnicien(@PathVariable("id") Long id, @RequestBody Technicien technicien) {
        return technicienRepository.findById(id).map(technicien1 -> {
            technicien1.setNom(technicien.getNom());
            technicien1.setPrenom(technicien.getPrenom());
            technicien1.setEmail(technicien.getEmail());
            technicien1.setMot_de_passe(bCryptPasswordEncoder.encode(technicien.getMot_de_passe()));

            if (technicien.isEtat() != technicien1.isEtat()) {
                String etat = technicien1.isEtat() ? "Bloqué" : "Accepté";
                emailService.SendSimpleMessage(technicien1.getEmail(), "État de votre compte", "Votre compte a été " + etat);
            }

            technicien1.setEtat(technicien.isEtat());
            return ResponseEntity.ok(technicienRepository.save(technicien1));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<Technicien> updateTechnicien(@PathVariable("id") Long id, @RequestBody Technicien technicien) {
        return technicienRepository.findById(id).map(existing -> {
            existing.setNom(technicien.getNom());
            existing.setPrenom(technicien.getPrenom());
            existing.setEmail(technicien.getEmail());
            return ResponseEntity.ok(technicienRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Technicien> modifierPassword(@PathVariable("id") Long id, @RequestBody Technicien technicien) {
        return technicienRepository.findById(id).map(existing -> {
            existing.setMot_de_passe(bCryptPasswordEncoder.encode(technicien.getMot_de_passe()));
            return ResponseEntity.ok(technicienRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/checkOldPassword/{id}")
    public ResponseEntity<Boolean> checkOldPassword(@PathVariable("id") Long id, @RequestBody Map<String, String> passwordMap) {
        String oldPassword = passwordMap.get("oldPassword");
        return technicienRepository.findById(id).map(existing -> {
            boolean match = bCryptPasswordEncoder.matches(oldPassword, existing.getMot_de_passe());
            return ResponseEntity.ok(match);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void supprimerTechnicien(@PathVariable("id") long id) {
        technicienServices.supprimerTechnicien(id);
    }

    @GetMapping
    public List<Technicien> afficherTechnicien() {
        return technicienServices.listTechnicien();
    }

    @GetMapping("/{id}")
    public Optional<Technicien> getTechnicienById(@PathVariable("id") long id) {
        return technicienServices.getTechnicienById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginTechnicien(@RequestBody Technicien technicien) {
        HashMap<String, Object> response = new HashMap<>();
        Technicien userFromDB = technicienRepository.findTechnicienByEmail(technicien.getEmail());

        if (userFromDB == null) {
            response.put("message", "Technicien not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else if (!userFromDB.isEtat()) {
            response.put("message", "Votre compte est désactivé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(technicien.getMot_de_passe(), userFromDB.getMot_de_passe());
            if (!compare) {
                response.put("message", "Technicien not found !");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
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
        }
    }

    @Autowired
    private RestPasswordServicesimp restPasswordServices;



    @Autowired
    private EmailServices emailServices;


    @RequestMapping(value = "/forgotmdp", method = RequestMethod.POST)
    public ResponseEntity<?> forgotMdpTechnicien(@RequestBody Technicien technicien) {
        Technicien technicienFromDB = technicienRepository.findTechnicienByEmail(technicien.getEmail());

        if (technicienFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Technicien non trouvé");
        } else {
            String nvmdp = restPasswordServices.nvMdp();
            technicienFromDB.setMot_de_passe(bCryptPasswordEncoder.encode(nvmdp));
            technicienFromDB.setEtat(true); // Optionnel : réactiver le compte
            technicienRepository.save(technicienFromDB);

            emailService.SendSimpleMessage(
                    technicienFromDB.getEmail(),
                    "Réinitialisation de votre mot de passe",
                    "Bonjour,\nVotre mot de passe sur Sagemcom a été réinitialisé : " + nvmdp
            );

            return ResponseEntity.ok("Nouveau mot de passe envoyé par email");
        }
    }


}