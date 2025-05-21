package com.example.demo.Services;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@Slf4j
@Service
public class EmailServicesimp implements EmailServices {
    private  final JavaMailSender emailSender;
    public EmailServicesimp(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Override
    public void SendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@baeldung.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        try {
            emailSender.send(message);
        } catch (MailException e) {
            log.error(e.getMessage());
        }


    }

    @Override
    public void emailSender(String email, String testEmail, String s) {

    }
}