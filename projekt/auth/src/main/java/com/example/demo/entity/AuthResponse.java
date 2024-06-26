package com.example.demo.entity;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

//https://stormit.pl/lombok/#lombok-builder
@Data
public class AuthResponse {
    private final String timestamp;
    private final String message;
    private final Code code;

    public AuthResponse(Code code) {
        this.timestamp = String.valueOf(new Timestamp(System.currentTimeMillis()));
        this.message = code.label;
        this.code = code;
    }
}
