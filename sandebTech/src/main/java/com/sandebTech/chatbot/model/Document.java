package com.sandebTech.chatbot.model;

import lombok.Data;

import java.util.List;

@Data
public class Document {

    private String id;

    private String domain;

    private String type;

    private String title;

    private List<String> keywords;

    private List<String> phrases;

    private String content;

    private Double boost;

    private Button button;

}