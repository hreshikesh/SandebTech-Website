package com.sandebTech.chatbot.dto;

import com.sandebTech.chatbot.model.ActionButton;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class ChatResponse {

    private String answer;

    private ActionButton button;

}