package com.example.demo.Services;

import com.example.demo.Repository.MessageRepository;
import com.example.demo.entite.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class MessageServicesimp implements MessageServices {
    @Autowired
    MessageRepository messageRepository;

    @Override
    public Message ajouterMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message modifierMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> listMessages() {
        return messageRepository.findAll();
    }

    @Override
    public void supprimerMessage(Long id) {
        messageRepository.deleteById(id);
    }

    @Override
    public Optional<Message> getMessageById(Long id) {
        return messageRepository.findById(id);
    }
}
