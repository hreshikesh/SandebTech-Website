package com.sandebTech.chatbot.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CompanyKnowledge {

    private CompanyInfo company;

    private List<ServiceKnowledge> services;

    private List<FaqKnowledge> faq;

    private ActionsKnowledge actions;

    private List<SolutionKnowledge> solutions;

}