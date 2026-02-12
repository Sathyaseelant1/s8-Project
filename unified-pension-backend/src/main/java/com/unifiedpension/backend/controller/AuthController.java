package com.unifiedpension.backend.controller;

import com.unifiedpension.backend.dto.ForgotPasswordRequest;
import com.unifiedpension.backend.dto.LoginRequest;
import com.unifiedpension.backend.dto.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String DEMO_PASSWORD = "upvs@123";

    private static final Set<String> ALLOWED_ROLES = Set.of(
            "Central Admin",
            "State Officer",
            "Verification Officer"
    );

    private static final Map<String, String> OFFICER_ROLE_MAP = Map.of(
            "UPVS-ADM-1021", "Central Admin",
            "UPVS-ST-2241", "State Officer",
            "UPVS-VER-3490", "Verification Officer"
    );

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        if (!ALLOWED_ROLES.contains(request.getRole())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role selected");
        }

        String expectedRole = OFFICER_ROLE_MAP.get(request.getOfficerId());
        if (expectedRole == null || !expectedRole.equals(request.getRole())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid officer ID or role");
        }

        if (!DEMO_PASSWORD.equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return new LoginResponse(
                request.getOfficerId(),
                request.getRole(),
                "demo-token-" + request.getOfficerId(),
                "Login successful"
        );
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request
    ) {
        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Password reset request recorded for " + request.getOfficerId()
                )
        );
    }
}
