package com.sandebTech.google.repository;

import com.sandebTech.google.entity.GoogleToken;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GoogleTokenRepository
        extends JpaRepository<GoogleToken,Long> {


    GoogleToken findFirstByOrderByIdAsc();

}
