package com.sandebTech.chatbot.service;

import com.sandebTech.chatbot.dto.ChatResponse;
import com.sandebTech.chatbot.knowledge.KnowledgeRegistry;
import com.sandebTech.chatbot.model.KnowledgeDocument;
import jakarta.annotation.PostConstruct; // Spring Boot 2.x: use javax.annotation.PostConstruct instead
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Retrieval-Augmented answering over the SandebTech knowledge base.
 * <p>
 * At startup, every FAQ / service / solution / action entry is turned into a
 * "document" and indexed with TF-IDF. At query time, the question is vectorized
 * the same way and compared to every document with cosine similarity — the
 * best-matching document's answer wins. This replaces brittle substring/keyword
 * matching with a real (if lightweight) semantic retrieval step, entirely
 * in-process, no external AI calls required.
 */
@Service
@RequiredArgsConstructor
public class KnowledgeService {
    private final DomainService domainService;
    private final KnowledgeRegistry registry;
    private final GeminiService geminiService;

    /** Below this cosine similarity, we treat the query as "no real match" and fall back. */
    private static final double MIN_SIMILARITY = 0.05;

    private static final Pattern TOKEN_PATTERN = Pattern.compile("[a-zA-Z0-9]+");

    private static final Set<String> STOPWORDS = Set.of(
            "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
            "of", "in", "on", "at", "for", "to", "and", "or", "with", "without",
            "what", "which", "who", "how", "can", "could", "would", "will",
            "you", "your", "yours", "we", "our", "us", "i", "me", "my",
            "do", "does", "did", "about", "tell", "please", "hi", "hello",
            "it", "its", "this", "that", "these", "those", "know"
    );

    // --- built once at startup ---
    private final Map<String, List<IndexedDoc>> indexes = new HashMap<>();
    private Map<String, Double> idf = new HashMap<>();

    private record RawDoc(String id, String domain, Map<String, Integer> termFreq, ChatResponse response) {}

    private record IndexedDoc(String id, Map<String, Double> vector, double norm, ChatResponse response) {}

    @PostConstruct
    void buildIndex() {
        List<RawDoc> rawDocs = new ArrayList<>();
        Map<String, Integer> docFrequency = new HashMap<>();

        for (KnowledgeDocument doc : registry.getDocuments()) {

            StringBuilder text = new StringBuilder();

            int repeat = Math.max(1,
                    doc.getBoost() == null ? 1 : (int) Math.round(doc.getBoost()));

            // repeat the title to boost its weight in the term-frequency count
            for (int i = 0; i < repeat; i++) {
                if (doc.getTitle() != null) {
                    text.append(doc.getTitle()).append(" ");
                }
            }

            if (doc.getContent() != null)
                text.append(doc.getContent()).append(" ");

            if (doc.getKeywords() != null)
                text.append(String.join(" ", doc.getKeywords())).append(" ");

            if (doc.getPhrases() != null) {
                for (String phrase : doc.getPhrases()) {
                    for (int i = 0; i < repeat; i++) {
                        text.append(phrase).append(" ");
                    }
                }
            }

            ChatResponse response = ChatResponse.builder()
                    .answer(doc.getContent())
                    .button(doc.getButton())
                    .build();

            Map<String, Integer> termFreq = tokenize(text.toString());

            for (String term : termFreq.keySet()) {
                docFrequency.merge(term, 1, Integer::sum);
            }


            String domain = doc.getDomain() != null ? doc.getDomain() : "all";

            rawDocs.add(new RawDoc(doc.getId(), domain, termFreq, response));
        }

        int totalDocs = Math.max(rawDocs.size(), 1);
        Map<String, Double> newIdf = new HashMap<>();
        for (Map.Entry<String, Integer> e : docFrequency.entrySet()) {
            newIdf.put(e.getKey(), Math.log((double) (totalDocs + 1) / (e.getValue() + 1)) + 1);
        }

        Map<String, List<IndexedDoc>> newIndexes = new HashMap<>();
        for (RawDoc raw : rawDocs) {
            Map<String, Double> vector = new HashMap<>();
            for (Map.Entry<String, Integer> e : raw.termFreq().entrySet()) {
                double tfIdf = e.getValue() * newIdf.getOrDefault(e.getKey(), 0.0);
                vector.put(e.getKey(), tfIdf);
            }
            double norm = Math.sqrt(vector.values().stream().mapToDouble(v -> v * v).sum());

            IndexedDoc indexedDoc = new IndexedDoc(raw.id(), vector, norm, raw.response());

            newIndexes.computeIfAbsent(raw.domain(), k -> new ArrayList<>()).add(indexedDoc);
        }

        idf = newIdf;
        indexes.clear();
        indexes.putAll(newIndexes);
    }

    public ChatResponse ask(String question) {
        String domain = domainService.detect(question);

        Map<String, Integer> qTermFreq = tokenize(question);
        Map<String, Double> qVector = new HashMap<>();
        for (Map.Entry<String, Integer> e : qTermFreq.entrySet()) {
            qVector.put(e.getKey(), e.getValue() * idf.getOrDefault(e.getKey(), 0.0));
        }
        double qNorm = Math.sqrt(qVector.values().stream().mapToDouble(v -> v * v).sum());

        // 1) Search the detected domain first (unless it's already "all").
        IndexedDoc best = null;
        double bestScore = MIN_SIMILARITY;

        if (!"all".equals(domain)) {
            List<IndexedDoc> domainDocs = indexes.getOrDefault(domain, List.of());
            for (IndexedDoc doc : domainDocs) {
                double score = cosineSimilarity(qVector, qNorm, doc.vector(), doc.norm());
                if (score > bestScore) {
                    bestScore = score;
                    best = doc;
                }
            }
        }

        // 2) Nothing found (or domain was "all") — widen the search to every document.
        if (best == null) {
            List<IndexedDoc> allDocs = indexes.values()
                    .stream()
                    .flatMap(List::stream)
                    .toList();

            for (IndexedDoc doc : allDocs) {
                double score = cosineSimilarity(qVector, qNorm, doc.vector(), doc.norm());
                if (score > bestScore) {
                    bestScore = score;
                    best = doc;
                }
            }
        }

        if (best != null) {
            return best.response();
        }

        // No confident match anywhere — hand off to Gemini.
        return ChatResponse.builder()
                .answer(geminiService.ask(question))
                .build();
    }

    private Map<String, Integer> tokenize(String text) {
        Map<String, Integer> freq = new HashMap<>();
        Matcher m = TOKEN_PATTERN.matcher(text.toLowerCase());
        while (m.find()) {
            String token = m.group();

            if (token.length() < 2)
                continue;

            if (STOPWORDS.contains(token))
                continue;

            freq.merge(token, 1, Integer::sum);
        }
        return freq;
    }

    private double cosineSimilarity(Map<String, Double> v1, double norm1, Map<String, Double> v2, double norm2) {
        if (norm1 == 0 || norm2 == 0) return 0.0;

        // iterate the smaller map for efficiency
        Map<String, Double> smaller = v1.size() < v2.size() ? v1 : v2;
        Map<String, Double> larger = v1.size() < v2.size() ? v2 : v1;

        double dot = 0.0;
        for (Map.Entry<String, Double> e : smaller.entrySet()) {
            Double otherVal = larger.get(e.getKey());
            if (otherVal != null) {
                dot += e.getValue() * otherVal;
            }
        }

        return dot / (norm1 * norm2);
    }
}