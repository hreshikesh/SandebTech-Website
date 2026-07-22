package com.sandebTech.chatbot.controller;

import com.sandebTech.chatbot.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatbot/test")
@RequiredArgsConstructor
public class GeminiTestController {

    private final GeminiService geminiService;

    @GetMapping
    public String test(@RequestParam String q) {
        return geminiService.ask(q);
    }

}