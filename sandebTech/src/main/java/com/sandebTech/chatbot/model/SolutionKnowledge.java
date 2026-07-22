package com.sandebTech.chatbot.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SolutionKnowledge {

    private String id;

    private String title;

    private List<String> keywords;

    private String description;

    private ActionButton button;
}