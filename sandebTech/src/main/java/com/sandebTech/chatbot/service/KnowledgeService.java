package com.sandebTech.chatbot.service;

import com.sandebTech.chatbot.dto.ChatResponse;
import com.sandebTech.chatbot.knowledge.KnowledgeLoader;
import com.sandebTech.chatbot.model.FaqKnowledge;
import com.sandebTech.chatbot.model.ServiceKnowledge;
import com.sandebTech.chatbot.model.SolutionKnowledge;
import jakarta.annotation.PostConstruct; // Spring Boot 2.x: use javax.annotation.PostConstruct instead
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    private final KnowledgeLoader loader;
    private  final GeminiService geminiService;

    /** Below this cosine similarity, we treat the query as "no real match" and fall back. */
    private static final double MIN_SIMILARITY = 0.05;

    private static final Pattern TOKEN_PATTERN = Pattern.compile("[a-zA-Z0-9]+");

    private static final java.util.Set<String> STOPWORDS = java.util.Set.of(
            "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
            "of", "in", "on", "at", "for", "to", "and", "or", "with", "without",
            "what", "which", "who", "how", "can", "could", "would", "will",
            "you", "your", "yours", "we", "our", "us", "i", "me", "my",
            "do", "does", "did", "about", "tell", "please", "hi", "hello",
            "it", "its", "this", "that", "these", "those", "know"
    );

    // --- built once at startup ---
    private List<IndexedDoc> index = new ArrayList<>();
    private Map<String, Double> idf = new HashMap<>();

    private record RawDoc(String id, Map<String, Integer> termFreq, ChatResponse response) {}

    private record IndexedDoc(String id, Map<String, Double> vector, double norm, ChatResponse response) {}

    @PostConstruct
    void buildIndex() {

        if (loader.getKnowledge() == null) {
            throw new IllegalStateException(
                    "KnowledgeLoader.getKnowledge() returned null. The knowledge base must be " +
                            "fully loaded before KnowledgeService initializes its index — check that " +
                            "the knowledge JSON file path is correct and that KnowledgeLoader populates " +
                            "it eagerly (e.g. in its own constructor or @PostConstruct)."
            );
        }

        List<RawDoc> rawDocs = new ArrayList<>();

        // FAQ
        for (FaqKnowledge faq : safe(loader.getKnowledge().getFaq())) {
            String text = joinSafe(faq.getKeywords()) + " " + nullToEmpty(faq.getAnswer());
            rawDocs.add(toRawDoc("faq-" + faq.getId(), text,
                    ChatResponse.builder().answer(faq.getAnswer()).button(faq.getButton()).build()));
        }

        // SERVICES (specific)
        for (ServiceKnowledge s : safe(loader.getKnowledge().getServices())) {
            String text = joinSafe(s.getKeywords()) + " " + nullToEmpty(s.getTitle()) + " " + nullToEmpty(s.getDescription());
            rawDocs.add(toRawDoc("service-" + s.getId(), text,
                    ChatResponse.builder().answer(s.getDescription()).button(s.getButton()).build()));
        }

        // SERVICES (generic overview) - built dynamically so it stays in sync with the JSON
        {
            StringBuilder overview = new StringBuilder("We offer the following engineering services:\n\n");
            for (ServiceKnowledge s : safe(loader.getKnowledge().getServices())) {
                overview.append("• ").append(nullToEmpty(s.getTitle())).append("\n");
            }
            overview.append("\nWhich service would you like to know more about?");

            String text = "service services what services your services our services engineering services list of services offerings";
            rawDocs.add(toRawDoc("services-overview", text,
                    ChatResponse.builder().answer(overview.toString()).build()));
        }

        // SOLUTIONS (specific)
        for (SolutionKnowledge sol : safe(loader.getKnowledge().getSolutions())) {
            String text = joinSafe(sol.getKeywords()) + " " + nullToEmpty(sol.getTitle()) + " " + nullToEmpty(sol.getDescription());
            rawDocs.add(toRawDoc("solution-" + sol.getId(), text,
                    ChatResponse.builder().answer(sol.getDescription()).button(sol.getButton()).build()));
        }

        // SOLUTIONS (generic overview)
        {
            StringBuilder overview = new StringBuilder("We currently provide four major engineering solutions:\n\n");
            for (SolutionKnowledge sol : safe(loader.getKnowledge().getSolutions())) {
                overview.append("• ").append(nullToEmpty(sol.getTitle())).append("\n");
            }
            overview.append("\nWhich solution would you like to explore?");

            String text = "solution solutions what solutions your solutions our solutions engineering solutions list of solutions offerings";
            rawDocs.add(toRawDoc("solutions-overview", text,
                    ChatResponse.builder().answer(overview.toString()).build()));
        }

        // CONTACT
        if (loader.getKnowledge().getActions() == null || loader.getKnowledge().getActions().getContact() == null) {
            throw new IllegalStateException("knowledge.json is missing actions.contact");
        }
        rawDocs.add(toRawDoc("contact",
                "contact phone email call address reach office location get in touch "
                        + nullToEmpty(loader.getKnowledge().getActions().getContact().getMessage()),
                ChatResponse.builder()
                        .answer(loader.getKnowledge().getActions().getContact().getMessage())
                        .button(loader.getKnowledge().getActions().getContact().getButton())
                        .build()));

        // MEETING
        if (loader.getKnowledge().getActions().getMeeting() == null) {
            throw new IllegalStateException("knowledge.json is missing actions.meeting");
        }
        rawDocs.add(toRawDoc("meeting",
                "meeting book appointment schedule consultation book a call arrange "
                        + nullToEmpty(loader.getKnowledge().getActions().getMeeting().getMessage()),
                ChatResponse.builder()
                        .answer(loader.getKnowledge().getActions().getMeeting().getMessage())
                        .button(loader.getKnowledge().getActions().getMeeting().getButton())
                        .build()));

        // COMPANY
        if (loader.getKnowledge().getCompany() == null) {
            throw new IllegalStateException("knowledge.json is missing the company section");
        }
        rawDocs.add(toRawDoc("company",
                "company about sandebtech who are you what is sandebtech overview "
                        + nullToEmpty(loader.getKnowledge().getCompany().getDescription()),
                ChatResponse.builder().answer(loader.getKnowledge().getCompany().getDescription()).build()));

        // ---- compute IDF across the corpus ----
        int docCount = rawDocs.size();
        Map<String, Integer> docFrequency = new HashMap<>();

        for (RawDoc doc : rawDocs) {
            for (String term : doc.termFreq().keySet()) {
                docFrequency.merge(term, 1, Integer::sum);
            }
        }

        Map<String, Double> computedIdf = new HashMap<>();
        for (Map.Entry<String, Integer> entry : docFrequency.entrySet()) {
            // smoothed idf: avoids zero/negative weights, always > 0
            double value = Math.log((double) (docCount + 1) / (entry.getValue() + 1)) + 1.0;
            computedIdf.put(entry.getKey(), value);
        }

        // ---- build TF-IDF vectors ----
        List<IndexedDoc> newIndex = new ArrayList<>();
        for (RawDoc doc : rawDocs) {
            Map<String, Double> vector = new HashMap<>();
            for (Map.Entry<String, Integer> tf : doc.termFreq().entrySet()) {
                double weight = tf.getValue() * computedIdf.getOrDefault(tf.getKey(), 0.0);
                vector.put(tf.getKey(), weight);
            }
            double norm = vectorNorm(vector);
            newIndex.add(new IndexedDoc(doc.id(), vector, norm, doc.response()));
        }

        this.idf = computedIdf;
        this.index = newIndex;
    }

    public ChatResponse ask(String question) {

        Map<String, Integer> queryTf = tokenize(question);

        Map<String, Double> queryVector = new HashMap<>();
        for (Map.Entry<String, Integer> tf : queryTf.entrySet()) {
            // unseen terms get the "rarest possible" idf so they still contribute signal
            double weight = tf.getValue() * idf.getOrDefault(tf.getKey(), maxIdf());
            queryVector.put(tf.getKey(), weight);
        }

        double queryNorm = vectorNorm(queryVector);

        if (queryNorm == 0.0) {
            return fallback();
        }

        IndexedDoc best = null;
        double bestSimilarity = 0.0;

        for (IndexedDoc doc : index) {
            double similarity = cosineSimilarity(queryVector, queryNorm, doc.vector(), doc.norm());
            if (similarity > bestSimilarity) {
                bestSimilarity = similarity;
                best = doc;
            }
        }

        if (best == null || bestSimilarity < MIN_SIMILARITY) {


                return ChatResponse.builder()
                        .answer(geminiService.ask(question))
                        .build();


        }

        return best.response();
    }

    // =========================================================
    // helpers
    // =========================================================

    private RawDoc toRawDoc(String id, String text, ChatResponse response) {
        return new RawDoc(id, tokenize(text), response);
    }

    /** Returns an empty list instead of null, so callers can safely iterate. */
    private <T> List<T> safe(List<T> list) {
        return list == null ? List.of() : list;
    }

    /** Joins a possibly-null list of keywords into a space-separated string. */
    private String joinSafe(List<String> keywords) {
        if (keywords == null || keywords.isEmpty()) return "";
        return String.join(" ", keywords);
    }

    private String nullToEmpty(String s) {
        return s == null ? "" : s;
    }

    private Map<String, Integer> tokenize(String text) {
        Map<String, Integer> freq = new HashMap<>();
        if (text == null) return freq;

        Matcher matcher = TOKEN_PATTERN.matcher(text.toLowerCase());
        while (matcher.find()) {
            String token = matcher.group();
            if (token.length() < 2 || STOPWORDS.contains(token)) continue;
            freq.merge(token, 1, Integer::sum);
        }
        return freq;
    }

    private double vectorNorm(Map<String, Double> vector) {
        double sumSquares = 0.0;
        for (double v : vector.values()) {
            sumSquares += v * v;
        }
        return Math.sqrt(sumSquares);
    }

    private double cosineSimilarity(Map<String, Double> a, double normA, Map<String, Double> b, double normB) {
        if (normA == 0.0 || normB == 0.0) return 0.0;

        // iterate the smaller map for efficiency
        Map<String, Double> smaller = a.size() <= b.size() ? a : b;
        Map<String, Double> larger = a.size() <= b.size() ? b : a;

        double dot = 0.0;
        for (Map.Entry<String, Double> entry : smaller.entrySet()) {
            Double otherWeight = larger.get(entry.getKey());
            if (otherWeight != null) {
                dot += entry.getValue() * otherWeight;
            }
        }

        return dot / (normA * normB);
    }

    private double maxIdf() {
        return idf.values().stream().mapToDouble(Double::doubleValue).max().orElse(1.0);
    }

    private ChatResponse fallback() {
        var fallback = loader.getKnowledge().getActions().getFallback();
        if (fallback == null) {
            return ChatResponse.builder()
                    .answer("I'm sorry, I couldn't find the information you're looking for.")
                    .build();
        }
        return ChatResponse.builder()
                .answer(fallback.getMessage())
                .button(fallback.getButton())
                .build();
    }
}