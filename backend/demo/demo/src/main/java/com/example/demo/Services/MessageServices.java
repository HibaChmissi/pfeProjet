package com.example.demo.Services;

import com.example.demo.entite.Message;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface MessageServices {

        Message ajouterMessage(Message message);
        Message modifierMessage(Message message);
        List<Message> listMessages();
        void supprimerMessage(Long id);
        Optional<Message> getMessageById(Long id);
}

