package com.sandebTech.download.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;


@Builder
@Getter
public class DownloadResponse {
    private Long id;

    private String name;

    private String email;

    private String phone;

    private LocalDateTime downloadedAt;
}
