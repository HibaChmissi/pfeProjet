package com.example.demo.Restcontroller;
import com.example.demo.Services.RestPasswordServicesimp;
import com.example.demo.entite.Responsable;

import com.example.demo.Repository.ResponsableRepository;
import com.example.demo.Services.EmailServices;
import com.example.demo.Services.ResponsableServices;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/responsable")
public class ResponsableRestcontroller {
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    ResponsableRepository responsableRepository;

    @Autowired
    EmailServices emailService;

    @Autowired
    ResponsableServices responsableServices;

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> AjouterResponsable(@RequestBody Responsable model) {
        HashMap<String, Object> response = new HashMap<>();
        if (responsableRepository.existsByEmail(model.getEmail())) {
            response.put("message", "email existe déjà !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            model.setMot_de_passe(this.bCryptPasswordEncoder.encode(model.getMot_de_passe()));
            Responsable savedUser = responsableServices.ajouterResponsable(model);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Responsable modifierResponsable(@RequestBody Responsable responsable_, @PathVariable("id") Long id) {
        if (responsableRepository.findById(id).isPresent()) {
            Responsable responsable_1 = responsableRepository.findById(id).get();
            responsable_1.setNom(responsable_.getNom());
            responsable_1.setPrenom(responsable_.getPrenom());
            responsable_1.setEmail(responsable_.getEmail());
            responsable_1.setMot_de_passe(this.bCryptPasswordEncoder.encode(responsable_.getMot_de_passe()));

            if (responsable_.isEtat() != responsable_1.isEtat()) {
                String etat = responsable_1.isEtat() ? "Bloqué" : "Accepté";
                emailService.SendSimpleMessage (responsable_1.getEmail(), "État de votre compte", "Votre compte a été " + etat);
            }
            responsable_1.setEtat(responsable_.isEtat());
            return responsableRepository.save(responsable_1);
        }
        return null;
    }

    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<Responsable> UpdateResponsable(@PathVariable("id") Long id, @RequestBody Responsable responsable_) {
        return responsableRepository.findById(id).map(existingRespinsable -> {
            existingRespinsable.setNom(responsable_.getNom());
            existingRespinsable.setPrenom(responsable_.getPrenom());
            existingRespinsable.setEmail(responsable_.getEmail());
            responsableRepository.save(existingRespinsable);
            return ResponseEntity.ok(existingRespinsable);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<Responsable> modifierPassword(@PathVariable("id") Long id, @RequestBody Responsable responsable_) {
        return responsableRepository.findById(id).map(existingResponsable -> {
            existingResponsable.setMot_de_passe(bCryptPasswordEncoder.encode(responsable_.getMot_de_passe()));
            responsableRepository.save(existingResponsable);
            return ResponseEntity.ok(existingResponsable);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/checkOldPassword/{id}")
    public ResponseEntity<Boolean> checkOldPassword(@PathVariable("id") Long id, @RequestBody Map<String, String> passwordMap) {
        String oldPassword = passwordMap.get("oldPassword");
        return responsableRepository.findById(id).map(existingResponsable -> {
            boolean isMatch = bCryptPasswordEncoder.matches(oldPassword, existingResponsable.getMot_de_passe());
            return ResponseEntity.ok(isMatch);
        }).orElse(ResponseEntity.notFound().build());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void supprimerResponsable(@PathVariable("id") long id) {
        responsableServices.supprimerResponsable(id);
    }

    @GetMapping
    public List<Responsable> afficherResponsable() {
        return responsableServices.listResponsable();
    }

    @GetMapping("/{id}")
    public Optional<Responsable> getresponsableById(@PathVariable("id") long id) {
        return responsableServices.getResponsableById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginResponsable(@RequestBody Responsable responsable_) {
        HashMap<String, Object> response = new HashMap<>();
        Responsable userFromDB = responsableRepository.findResponsableByEmail(responsable_.getEmail());

        if (userFromDB == null) {
            response.put("message", "Responsable not found !");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else if (!userFromDB.isEtat()) {
            response.put("message", "Votre compte est désactivé");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        } else {
            boolean compare = this.bCryptPasswordEncoder.matches(responsable_.getMot_de_passe(), userFromDB.getMot_de_passe());
            if (!compare) {
                response.put("message", "Responsable not found !");
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

    @PostMapping("/forgotmdp")
    public ResponseEntity<?> forgotMdpResponsable(@RequestBody Responsable responsable) {
        Responsable responsableFromDB = responsableRepository.findResponsableByEmail(responsable.getEmail());

        if (responsableFromDB == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Responsable non trouvé");
        } else {
            String nvmdp = restPasswordServices.nvMdp();
            responsableFromDB.setMot_de_passe(bCryptPasswordEncoder.encode(nvmdp));
            responsableFromDB.setEtat(true); // réactiver le compte si besoin
            responsableRepository.save(responsableFromDB);

            emailService.SendSimpleMessage(
                    responsableFromDB.getEmail(),
                    "Réinitialisation de votre mot de passe",
                    "Bonjour,\nVotre mot de passe sur Sagemcom a été réinitialisé : " + nvmdp
            );

            return ResponseEntity.ok("Nouveau mot de passe envoyé par email");
        }
    }


}