package com.sandebTech.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.CredentialRefreshListener;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;

import com.sandebTech.google.entity.GoogleToken;
import com.sandebTech.google.repository.GoogleTokenRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GoogleCalendarProvider {

    private final GoogleTokenRepository tokenRepository;

    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    public Calendar getCalendar() throws Exception {

        GoogleToken token = tokenRepository.findFirstByOrderByIdAsc();

        if (token == null) {
            throw new RuntimeException(
                    "Google Calendar not connected. Open /google/connect first."
            );
        }

        Credential credential = new GoogleCredential.Builder()
                .setTransport(GoogleNetHttpTransport.newTrustedTransport())
                .setJsonFactory(GsonFactory.getDefaultInstance())
                .setClientSecrets(clientId, clientSecret)
                .addRefreshListener(new CredentialRefreshListener() {
                    @Override
                    public void onTokenResponse(Credential credential, TokenResponse tokenResponse) {
                        // Called whenever the access token is refreshed - persist the new value
                        token.setAccessToken(credential.getAccessToken());
                        if (credential.getRefreshToken() != null) {
                            token.setRefreshToken(credential.getRefreshToken());
                        }
                        tokenRepository.save(token);
                    }

                    @Override
                    public void onTokenErrorResponse(Credential credential,
                                                     com.google.api.client.auth.oauth2.TokenErrorResponse tokenErrorResponse) {
                        // Refresh token likely revoked/expired - clear it so /google/connect is required again
                        tokenRepository.delete(token);
                    }
                })
                .build();

        credential.setAccessToken(token.getAccessToken());
        credential.setRefreshToken(token.getRefreshToken());

        return new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                credential
        )
                .setApplicationName("SandebTech")
                .build();
    }
}