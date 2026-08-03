package com.sandebTech.chatbot.service;

import org.springframework.stereotype.Service;

@Service
public class DomainService {

    public String detect(String question){

        String q = question.toLowerCase();

        if(q.contains("career") || q.contains("job") || q.contains("hiring"))
            return "careers";

        if(q.contains("hvac"))
            return "hvac";

        if(q.contains("maritime") || q.contains("ship"))
            return "maritime";

        if(q.contains("lotus"))
            return "lotus";

        if(q.contains("caeses"))
            return "caeses";

        if(q.contains("turbomachinery"))
            return "turbomachinery";

        if(q.contains("fire"))
            return "firesafety";

        if(q.contains("electronic"))
            return "electronics";

        if(q.contains("news"))
            return "news";

        if(q.contains("white paper"))
            return "whitepapers";

        if(q.contains("case study"))
            return "casestudies";

        return "all";
    }

}