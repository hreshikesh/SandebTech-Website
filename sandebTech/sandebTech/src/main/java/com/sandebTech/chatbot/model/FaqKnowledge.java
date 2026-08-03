package com.sandebTech.chatbot.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FaqKnowledge {

    private String id;

    private List<String> keywords;

    private String answer;

    private ActionButton button;

}