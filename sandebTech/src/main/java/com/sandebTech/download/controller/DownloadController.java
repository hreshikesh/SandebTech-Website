package com.sandebTech.download.controller;

import com.sandebTech.download.dto.DownloadRequest;
import com.sandebTech.download.service.DownloadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/download")
public class DownloadController {

    private final DownloadService downloadService;


    @PostMapping("/save")
    public ResponseEntity<Boolean> saveDownloadData(@Valid @RequestBody DownloadRequest downloadRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(downloadService.submitDownLoadInfo(downloadRequest));
    }
}
