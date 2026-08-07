package com.sandebTech.download.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="download_details")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DownloadEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(nullable = false, length = 120)
    private String  documentTitle;

    @Column(nullable = false, updatable = false)
    private LocalDateTime downloadedAt;
}
