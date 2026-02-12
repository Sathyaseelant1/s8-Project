package com.unifiedpension.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ForgotPasswordRequest {

    @NotBlank(message = "Officer ID is required")
    @Size(min = 4, max = 40, message = "Officer ID must be 4-40 characters")
    private String officerId;

    @NotBlank(message = "Role is required")
    private String role;

    public String getOfficerId() {
        return officerId;
    }

    public void setOfficerId(String officerId) {
        this.officerId = officerId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
