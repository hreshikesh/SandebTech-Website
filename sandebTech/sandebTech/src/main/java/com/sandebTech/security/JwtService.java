package com.sandebTech.security;


import com.sandebTech.user.entity.User;

public interface JwtService {

    String generateToken(User user);

    String extractEmail(String token);

    boolean isTokenValid(String token);

}