package com.sandebTech.chatbot.knowledge;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sandebTech.chatbot.model.Document;
import com.sandebTech.chatbot.model.KnowledgeDocument;
import com.sandebTech.chatbot.model.KnowledgeFile;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@Getter
public class KnowledgeLoader {

    private final List<KnowledgeDocument> documents = new ArrayList<>();

    @PostConstruct
    public void loadKnowledge() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            PathMatchingResourcePatternResolver resolver =
                    new PathMatchingResourcePatternResolver();

            Resource[] resources =
                    resolver.getResources("classpath:chatbot/*.json");

            for (Resource resource : resources) {

                InputStream input = resource.getInputStream();

                KnowledgeFile file =
                        mapper.readValue(input, KnowledgeFile.class);

                if (file.getDocuments() != null) {

                    for (KnowledgeDocument document : file.getDocuments()) {

                        document.setDomain(file.getDomain());

                        documents.add(document);

                    }

                }

                System.out.println("Loaded : " + resource.getFilename());

            }

            System.out.println("--------------------------------");
            System.out.println("Knowledge Loaded Successfully");
            System.out.println("Total Documents : " + documents.size());
            System.out.println("--------------------------------");

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException("Unable to load chatbot knowledge.", e);

        }

    }

}