package com.sandebTech.chatbot.service;

import org.springframework.stereotype.Service;

@Service
public class IntentService {

    public String detect(String message){

        String text = message.toLowerCase();

        if(text.contains("service"))
            return "SERVICE";

        if(text.contains("meeting"))
            return "MEETING";

        if(text.contains("contact"))
            return "CONTACT";

        if(text.contains("shipflow"))
            return "SHIPFLOW";

        return "UNKNOWN";

    }

}