package com.sandebTech.chatbot.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CompanyInfo {

    private String name;

    private String tagline;

    private String description;

    private String headquarters;

    private String email;

    private List<String> industries;

}