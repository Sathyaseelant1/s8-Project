package com.unifiedpension.backend.dto;

import java.util.List;

public class DuplicateGroupResponse {
    private String aadhaarNumber;
    private String fullName;
    private String state;
    private List<String> schemes;
    private int count;
    private List<PensionerResponse> records;

    public DuplicateGroupResponse(
            String aadhaarNumber,
            String fullName,
            String state,
            List<String> schemes,
            int count,
            List<PensionerResponse> records
    ) {
        this.aadhaarNumber = aadhaarNumber;
        this.fullName = fullName;
        this.state = state;
        this.schemes = schemes;
        this.count = count;
        this.records = records;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public String getState() {
        return state;
    }

    public List<String> getSchemes() {
        return schemes;
    }

    public int getCount() {
        return count;
    }

    public List<PensionerResponse> getRecords() {
        return records;
    }
}
