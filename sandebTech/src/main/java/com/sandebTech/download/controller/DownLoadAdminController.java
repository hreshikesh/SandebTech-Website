package com.sandebTech.download.controller;

import com.sandebTech.download.dto.DownloadResponse;
import com.sandebTech.download.service.DownloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/download")
public class DownLoadAdminController {
    private final DownloadService downloadService;


    @GetMapping
    public ResponseEntity<Page<DownloadResponse>> getAllDownloadData(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ){
            return ResponseEntity.ok(downloadService.getAllDownloadDetails(page, size, sortBy, direction));
    }
}
