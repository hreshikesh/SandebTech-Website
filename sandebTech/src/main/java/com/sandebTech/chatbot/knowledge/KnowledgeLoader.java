package com.sandebTech.chatbot.knowledge;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sandebTech.chatbot.model.CompanyKnowledge;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
@Getter
public class KnowledgeLoader {

    private CompanyKnowledge knowledge;

    @PostConstruct
    public void loadKnowledge() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            InputStream input =
                    new ClassPathResource("chatbot/company.json")
                            .getInputStream();

            knowledge = mapper.readValue(input, CompanyKnowledge.class);

            System.out.println("✅ Company knowledge loaded successfully.");

        } catch (Exception e) {

            e.printStackTrace();   // IMPORTANT

            throw new RuntimeException("Unable to load company knowledge", e);
        }
    }
}