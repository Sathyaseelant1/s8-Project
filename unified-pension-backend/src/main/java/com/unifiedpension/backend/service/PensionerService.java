package com.unifiedpension.backend.service;

import com.unifiedpension.backend.dto.PensionerRequest;
import com.unifiedpension.backend.dto.PensionerResponse;
import com.unifiedpension.backend.dto.DuplicateGroupResponse;
import com.unifiedpension.backend.entity.PensionerStatus;

import java.util.List;

public interface PensionerService {

    PensionerResponse addPensioner(PensionerRequest pensioner);

    List<PensionerResponse> getAllPensioners();

    PensionerResponse getPensionerById(Long id);

    List<DuplicateGroupResponse> getDuplicateGroups();

    PensionerResponse updateStatus(Long id, PensionerStatus status);
}
