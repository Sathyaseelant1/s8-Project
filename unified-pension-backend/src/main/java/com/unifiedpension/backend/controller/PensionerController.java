package com.unifiedpension.backend.controller;

import com.unifiedpension.backend.dto.PensionerRequest;
import com.unifiedpension.backend.dto.PensionerResponse;
import com.unifiedpension.backend.dto.DuplicateGroupResponse;
import com.unifiedpension.backend.service.PensionerService;
import com.unifiedpension.backend.dto.StatusUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pensioners")
public class PensionerController {

    private final PensionerService pensionerService;

    public PensionerController(PensionerService pensionerService) {
        this.pensionerService = pensionerService;
    }

    @PostMapping
    public PensionerResponse createPensioner(@Valid @RequestBody PensionerRequest pensioner) {
        return pensionerService.addPensioner(pensioner);
    }

    @GetMapping
    public List<PensionerResponse> getAllPensioners() {
        return pensionerService.getAllPensioners();
    }

    @GetMapping("/{id}")
    public PensionerResponse getPensionerById(@PathVariable Long id) {
        return pensionerService.getPensionerById(id);
    }

    @GetMapping("/duplicates")
    public List<DuplicateGroupResponse> getDuplicates() {
        return pensionerService.getDuplicateGroups();
    }

    @PatchMapping("/{id}/status")
    public PensionerResponse updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request
    ) {
        return pensionerService.updateStatus(id, request.getStatus());
    }
}
