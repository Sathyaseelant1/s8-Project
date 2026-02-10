package com.unifiedpension.backend.exception;

public class PensionerNotFoundException extends RuntimeException {
    public PensionerNotFoundException(String message) {
        super(message);
    }
}
