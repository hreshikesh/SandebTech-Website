package com.sandebTech.chatbot.service;

import com.google.genai.Client;
import com.google.genai.errors.ClientException;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeminiService {

    private final Client geminiClient;


    @Value("${gemini.model:gemini-flash-latest}")
    private String modelId;

    private static final String FALLBACK_MESSAGE = "I'm not certain about that specific information.\n" +
            "\n" +
            "Would you like to:\n" +
            "• Contact our engineering team\n" +
            "• Book a consultation";

    public String ask(String question) {

        String prompt = """
                You are Sandeb AI.

                You are the AI assistant for SandebTech.

                IMPORTANT RULES:

                - Never invent information about SandebTech.
                - Never invent company services.
                - Never invent pricing.
                - Never invent company history.
                - If the user asks company-specific questions that you don't know, reply:
                  "I don't have verified information about that. Please contact SandebTech."

                You may answer general engineering questions about:

                • CFD
                • Fluid Mechanics
                • Hydrodynamics
                • Heat Transfer
                • Turbomachinery
                • Marine Engineering
                • Naval Architecture

                Keep answers concise and professional and short like 2 lines.

                User Question:

                """ + question;

        try {
            GenerateContentResponse response =
                    geminiClient.models.generateContent(modelId, prompt, null);

            String text = response.text();
            if (text == null || text.isBlank()) {
                log.warn("Gemini returned an empty response for model {}", modelId);
                return FALLBACK_MESSAGE;
            }
            return text;

        } catch (ClientException e) {

            log.error("Gemini client error (model={}): {}", modelId, e.getMessage(), e);
        } catch (Exception e) {
            log.error("Gemini call failed (model={}): {}", modelId, e.getMessage(), e);
        }

        return FALLBACK_MESSAGE;
    }
}