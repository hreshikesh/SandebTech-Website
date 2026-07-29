package com.sandebTech.chatbot.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class KnowledgeFile {

    private String domain;

    private List<KnowledgeDocument> documents = new ArrayList<>();

}