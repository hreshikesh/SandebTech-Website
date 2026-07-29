package com.sandebTech.chatbot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)

public class KnowledgeDocument {

    private String id;

    private String type;

    private String title;

    private String content;

    private List<String> keywords;

    private List<String> phrases;

    private Double boost = 1.0;

    private ActionButton button;

    private String domain;


}