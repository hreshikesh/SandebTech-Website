package com.sandebTech.download.service;

import com.sandebTech.contact.dto.ContactResponse;
import com.sandebTech.contact.entity.ContactMessage;
import com.sandebTech.download.dto.DownloadRequest;
import com.sandebTech.download.dto.DownloadResponse;
import com.sandebTech.download.entity.DownloadEntity;
import com.sandebTech.download.repository.DownloadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DownloadServiceImpl implements DownloadService {

    private final DownloadRepository downloadRepository;


    @Override
    public boolean submitDownLoadInfo(DownloadRequest downloadRequest) {

        try {
            DownloadEntity downloadEntity = DownloadEntity.builder()


                    .name(downloadRequest.getName())
                    .email(downloadRequest.getEmail())
                    .phone(downloadRequest.getPhone())
                    .downloadedAt(LocalDateTime.now())
                    .build();

            downloadRepository.save(downloadEntity);

            return true;
        } catch (RuntimeException e) {
            throw new RuntimeException("Something Went Wrong");
        }
    }

    @Override
    public Page<DownloadResponse> getAllDownloadDetails(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc")

                ? Sort.by(sortBy).descending()

                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        return downloadRepository.findAll(pageable)

                .map(this::map);
    }

    private DownloadResponse map(DownloadEntity downloadEntity) {

        return DownloadResponse.builder()

                .id(downloadEntity.getId())
                .name(downloadEntity.getName())
                .email(downloadEntity.getEmail())
                .phone(downloadEntity.getPhone())
                .downloadedAt(downloadEntity.getDownloadedAt())
                .build();

    }
}
