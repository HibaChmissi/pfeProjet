package com.example.demo.Services;

import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class RestPasswordServicesimp implements RestPasswordServices{
    @Override
    public String nvMdp() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

}