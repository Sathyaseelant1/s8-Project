package com.unifiedpension.backend.dto;

import com.unifiedpension.backend.entity.PensionerStatus;
import jakarta.validation.constraints.NotNull;

public class StatusUpdateRequest {
    @NotNull(message = "Status is required")
    private PensionerStatus status;

    public PensionerStatus getStatus() {
        return status;
    }

    public void setStatus(PensionerStatus status) {
        this.status = status;
    }
}
