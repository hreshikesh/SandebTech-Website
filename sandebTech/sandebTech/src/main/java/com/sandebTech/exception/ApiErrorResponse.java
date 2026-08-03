package com.sandebTech.exception;


import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
public class ApiErrorResponse {

    private boolean success;

    private int status;

    private String message;

    private String path;

    private LocalDateTime timestamp;

    private Map<String, String> errors;

}