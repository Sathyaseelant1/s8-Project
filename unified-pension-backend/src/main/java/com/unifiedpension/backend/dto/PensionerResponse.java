package com.unifiedpension.backend.dto;

public class PensionerResponse {
    private Long id;
    private String fullName;
    private String aadhaarNumber;
    private String pensionScheme;
    private String state;
    private boolean active;
    private String status;
    private String startDate;
    private int yearsReceiving;
    private int monthsReceiving;
    private int pensionAmount;
    private int totalPensionReceived;
    private String bankName;
    private String accountNumber;
    private String lastVerificationDate;
    private String mobileNumber;

    public PensionerResponse(
            Long id,
            String fullName,
            String aadhaarNumber,
            String pensionScheme,
            String state,
            boolean active,
            String status,
            String startDate,
            int yearsReceiving,
            int monthsReceiving,
            int pensionAmount,
            int totalPensionReceived,
            String bankName,
            String accountNumber,
            String lastVerificationDate,
            String mobileNumber
    ) {
        this.id = id;
        this.fullName = fullName;
        this.aadhaarNumber = aadhaarNumber;
        this.pensionScheme = pensionScheme;
        this.state = state;
        this.active = active;
        this.status = status;
        this.startDate = startDate;
        this.yearsReceiving = yearsReceiving;
        this.monthsReceiving = monthsReceiving;
        this.pensionAmount = pensionAmount;
        this.totalPensionReceived = totalPensionReceived;
        this.bankName = bankName;
        this.accountNumber = accountNumber;
        this.lastVerificationDate = lastVerificationDate;
        this.mobileNumber = mobileNumber;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public String getPensionScheme() {
        return pensionScheme;
    }

    public String getState() {
        return state;
    }

    public boolean isActive() {
        return active;
    }

    public String getStatus() {
        return status;
    }

    public String getStartDate() {
        return startDate;
    }

    public int getYearsReceiving() {
        return yearsReceiving;
    }

    public int getMonthsReceiving() {
        return monthsReceiving;
    }

    public int getPensionAmount() {
        return pensionAmount;
    }

    public int getTotalPensionReceived() {
        return totalPensionReceived;
    }

    public String getBankName() {
        return bankName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getLastVerificationDate() {
        return lastVerificationDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }
}
