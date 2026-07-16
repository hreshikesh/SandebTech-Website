package com.sandebTech.google.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "google_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoogleToken {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @Column(columnDefinition = "TEXT")
    private String accessToken;



    @Column(columnDefinition = "TEXT")
    private String refreshToken;



    private Long expiryTime;

}