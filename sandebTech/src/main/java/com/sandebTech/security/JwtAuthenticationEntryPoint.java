package com.sandebTech.security;


import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sandebTech.exception.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;


import java.time.LocalDateTime;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) {

        try {

            response.setStatus(HttpStatus.UNAUTHORIZED.value());

            response.setContentType("application/json");

            ApiErrorResponse error = ApiErrorResponse.builder()

                    .success(false)

                    .status(HttpStatus.UNAUTHORIZED.value())

                    .message("Authentication required.")

                    .path(request.getRequestURI())

                    .timestamp(LocalDateTime.now())

                    .build();

            new ObjectMapper().writeValue(response.getOutputStream(), error);

        } catch (Exception ignored) {

        }

    }

}