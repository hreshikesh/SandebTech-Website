package com.sandebTech.download.service;

import com.sandebTech.download.dto.DownloadRequest;
import com.sandebTech.download.dto.DownloadResponse;
import org.springframework.data.domain.Page;


public interface DownloadService {
    boolean submitDownLoadInfo(DownloadRequest downloadRequest);

    Page<DownloadResponse> getAllDownloadDetails(int page,
                                                 int size,
                                                 String sortBy,
                                                 String direction);
}
