package com.sandebTech.google.controller;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;

import com.sandebTech.google.entity.GoogleToken;
import com.sandebTech.google.repository.GoogleTokenRepository;

import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/google")
@RequiredArgsConstructor
public class GoogleAuthController {

    private final GoogleAuthorizationCodeFlow flow;
    private final GoogleTokenRepository tokenRepository;

    @Value("${google.client.redirect-uri}")
    private String redirectUri;

    @GetMapping("/connect")
    public void connect(HttpServletResponse response) throws Exception {

        String url = flow.newAuthorizationUrl()
                .setRedirectUri(redirectUri)
                .build();

        response.sendRedirect(url);
    }

    @GetMapping("/oauth2callback")
    public String callback(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "error", required = false) String error
    ) throws Exception {

        if (error != null) {
            return "Google authorization failed: " + error;
        }

        if (code == null) {
            return "Google authorization callback received without a code. Please try /google/connect again.";
        }

        TokenResponse tokenResponse = flow.newTokenRequest(code)
                .setRedirectUri(redirectUri)
                .execute();

        Credential credential = flow.createAndStoreCredential(tokenResponse, "sandebtech");

        GoogleToken token = tokenRepository.findFirstByOrderByIdAsc();
        if (token == null) {
            token = new GoogleToken();
        }

        token.setAccessToken(credential.getAccessToken());

        if (credential.getRefreshToken() != null) {
            token.setRefreshToken(credential.getRefreshToken());
        }

        tokenRepository.save(token);

        return "Google Calendar Connected Successfully";
    }
}