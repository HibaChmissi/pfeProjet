package com.example.demo.Restcontroller;
import com.example.demo.Repository.MessageRepository;
import com.example.demo.Services.MessageServices;
import com.example.demo.entite.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/message")
public class MessageRestcontroller {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageServices messageServices;

    @PostMapping
    public ResponseEntity<?> ajouterMessage(@RequestBody Message message) {
        Message savedUser = messageRepository.save(message);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @DeleteMapping("/{id}")
    public void supprimerMessage(@PathVariable("id") long id) {
        messageServices.supprimerMessage(id);
    }

    @GetMapping
    public List<Message> afficherMessage() {
        return messageServices.listMessages();
    }

    @GetMapping("/{id}")
    public Optional<Message> getMessageById(@PathVariable("id") long id) {
        return messageServices.getMessageById(id);
    }
}

