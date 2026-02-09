package com.unifiedpension.backend.service;

import com.unifiedpension.backend.dto.DuplicateGroupResponse;
import com.unifiedpension.backend.dto.PensionerRequest;
import com.unifiedpension.backend.dto.PensionerResponse;
import com.unifiedpension.backend.entity.Pensioner;
import com.unifiedpension.backend.entity.PensionerStatus;
import com.unifiedpension.backend.exception.PensionerNotFoundException;
import com.unifiedpension.backend.repository.AuditLogRepository;
import com.unifiedpension.backend.repository.PensionerRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.unifiedpension.backend.entity.AuditLog;

@Service
public class PensionerServiceImpl implements PensionerService {

    private final PensionerRepository pensionerRepository;
    private final AuditLogRepository auditLogRepository;

    public PensionerServiceImpl(PensionerRepository pensionerRepository, AuditLogRepository auditLogRepository) {
        this.pensionerRepository = pensionerRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    public PensionerResponse addPensioner(PensionerRequest pensioner) {
        Pensioner entity = toEntity(pensioner);
        return toResponse(pensionerRepository.save(entity));
    }

    @Override
    public List<PensionerResponse> getAllPensioners() {
        return pensionerRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public PensionerResponse getPensionerById(Long id) {
        Pensioner pensioner = pensionerRepository.findById(id)
                .orElseThrow(() -> new PensionerNotFoundException("Pensioner not found"));
        return toResponse(pensioner);
    }

    @Override
    public PensionerResponse updateStatus(Long id, PensionerStatus status) {
        Pensioner pensioner = pensionerRepository.findById(id)
                .orElseThrow(() -> new PensionerNotFoundException("Pensioner not found"));
        pensioner.setStatus(status);
        pensioner.setActive(status == PensionerStatus.APPROVED);
        Pensioner saved = pensionerRepository.save(pensioner);
        auditLogRepository.save(
                new AuditLog(
                        "STATUS_UPDATE",
                        "System",
                        Instant.now(),
                        "Pensioner " + saved.getId() + " status -> " + saved.getStatus()
                )
        );
        return toResponse(saved);
    }

    @Override
    public List<DuplicateGroupResponse> getDuplicateGroups() {
        List<String> duplicates = pensionerRepository.findDuplicateAadhaarNumbers();
        if (duplicates.isEmpty()) {
            return List.of();
        }

        List<Pensioner> rows = pensionerRepository.findByAadhaarNumberIn(duplicates);
        Map<String, List<Pensioner>> grouped = rows.stream()
                .collect(Collectors.groupingBy(Pensioner::getAadhaarNumber));

        List<DuplicateGroupResponse> response = new ArrayList<>();
        for (Map.Entry<String, List<Pensioner>> entry : grouped.entrySet()) {
            List<Pensioner> group = entry.getValue();
            Pensioner first = group.get(0);
            List<String> schemes = group.stream()
                    .map(Pensioner::getPensionScheme)
                    .distinct()
                    .toList();
            List<PensionerResponse> records = group.stream()
                    .map(this::toResponse)
                    .toList();
            response.add(new DuplicateGroupResponse(
                    entry.getKey(),
                    first.getFullName(),
                    first.getState(),
                    schemes,
                    group.size(),
                    records
            ));
        }

        return response;
    }

    private Pensioner toEntity(PensionerRequest request) {
        PensionerStatus status = request.getStatus() != null
                ? request.getStatus()
                : PensionerStatus.PENDING;
        int years = request.getYearsReceiving() != null ? request.getYearsReceiving() : 0;
        int months = request.getMonthsReceiving() != null ? request.getMonthsReceiving() : 0;
        int amount = request.getPensionAmount() != null ? request.getPensionAmount() : 0;
        int total = request.getTotalPensionReceived() != null
                ? request.getTotalPensionReceived()
                : amount * (years * 12 + months);
        return new Pensioner(
                request.getFullName(),
                request.getAadhaarNumber(),
                request.getPensionScheme(),
                request.getState(),
                request.isActive(),
                status,
                request.getStartDate(),
                years,
                months,
                amount,
                total,
                request.getBankName(),
                request.getAccountNumber(),
                request.getLastVerificationDate(),
                request.getMobileNumber()
        );
    }

    private PensionerResponse toResponse(Pensioner entity) {
        return new PensionerResponse(
                entity.getId(),
                entity.getFullName(),
                entity.getAadhaarNumber(),
                entity.getPensionScheme(),
                entity.getState(),
                entity.isActive(),
                entity.getStatus() != null ? entity.getStatus().name() : PensionerStatus.PENDING.name(),
                entity.getStartDate() != null ? entity.getStartDate().toString() : null,
                entity.getYearsReceiving(),
                entity.getMonthsReceiving(),
                entity.getPensionAmount(),
                entity.getTotalPensionReceived(),
                entity.getBankName(),
                entity.getAccountNumber(),
                entity.getLastVerificationDate() != null ? entity.getLastVerificationDate().toString() : null,
                entity.getMobileNumber()
        );
    }
}
