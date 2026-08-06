package com.sandebTech.download.repository;

import com.sandebTech.download.entity.DownloadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DownloadRepository extends JpaRepository<DownloadEntity,Long> {
}
