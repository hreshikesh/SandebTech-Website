package com.sandebTech.chatbot.knowledge;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sandebTech.chatbot.model.KnowledgeFile;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
@Getter
@Slf4j
public class JsonLoader {

    private final List<KnowledgeFile> knowledgeFiles = new ArrayList<>();

    @PostConstruct
    public void load() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            PathMatchingResourcePatternResolver resolver =
                    new PathMatchingResourcePatternResolver();

            Resource[] resources =
                    resolver.getResources("classpath:chatbot/*.json");

            for (Resource resource : resources) {

                try (InputStream input = resource.getInputStream()) {

                    KnowledgeFile file =
                            mapper.readValue(input, KnowledgeFile.class);

                    knowledgeFiles.add(file);




                }

            }



        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}