package com.sandebTech.chatbot.matcher;

import org.springframework.stereotype.Component;

@Component
public class IntentMatcher {

    public boolean matches(String message, String... keywords) {

        message = normalize(message);

        for (String keyword : keywords) {

            if (message.contains(normalize(keyword))) {
                return true;
            }

        }

        return false;
    }

    public String normalize(String text) {

        return text
                .toLowerCase()
                .replaceAll("[^a-z0-9 ]", "")
                .replaceAll("\\s+", " ")
                .trim();
    }
}