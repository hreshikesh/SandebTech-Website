package com.sandebTech.chatbot.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActionsKnowledge {

    private ContactKnowledge contact;

    private MeetingKnowledge meeting;

    private FallbackKnowledge fallback;

}