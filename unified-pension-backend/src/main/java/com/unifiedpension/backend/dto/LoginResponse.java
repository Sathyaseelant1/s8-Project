package com.unifiedpension.backend.dto;

public class LoginResponse {
    private final String officerId;
    private final String role;
    private final String token;
    private final String message;

    public LoginResponse(String officerId, String role, String token, String message) {
        this.officerId = officerId;
        this.role = role;
        this.token = token;
        this.message = message;
    }

    public String getOfficerId() {
        return officerId;
    }

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }

    public String getMessage() {
        return message;
    }
}
