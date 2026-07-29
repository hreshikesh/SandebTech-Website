package com.sandebTech.chatbot.knowledge;

import com.sandebTech.chatbot.model.KnowledgeDocument;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;




@Service
@RequiredArgsConstructor
@Getter
@Slf4j
public class KnowledgeRegistry {

    private final JsonLoader loader;

    private final List<KnowledgeDocument> documents = new ArrayList<>();

    @PostConstruct
    public void build() {

        loader.getKnowledgeFiles().forEach(file ->
                {
                    for (KnowledgeDocument doc : file.getDocuments()) {

                        doc.setDomain(file.getDomain());

                        documents.add(doc);

                    }
                }
        );


    }

}