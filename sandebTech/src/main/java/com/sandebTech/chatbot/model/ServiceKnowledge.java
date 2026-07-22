package com.sandebTech.chatbot.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ServiceKnowledge {

    private String id;

    private String title;

    private List<String> keywords;

    private String description;

    private List<String> capabilities;

    private ActionButton button;

}