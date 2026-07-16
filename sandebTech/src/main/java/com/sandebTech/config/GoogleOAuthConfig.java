package com.sandebTech.config;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.CalendarScopes;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class GoogleOAuthConfig {

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Bean
    public GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow() throws Exception {

        GoogleClientSecrets.Details details = new GoogleClientSecrets.Details();
        details.setClientId(clientId);
        details.setClientSecret(clientSecret);

        GoogleClientSecrets secrets = new GoogleClientSecrets().setWeb(details);

        return new GoogleAuthorizationCodeFlow.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance(),
                secrets,
                List.of(CalendarScopes.CALENDAR)
        )
                .setAccessType("offline")
                .setApprovalPrompt("force") // ensures Google re-sends a refresh token on reconnect
                .build();
    }
}