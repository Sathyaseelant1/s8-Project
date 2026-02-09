package com.unifiedpension.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import com.unifiedpension.backend.entity.PensionerStatus;
import java.time.LocalDate;

public class PensionerRequest {

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 120, message = "Full name must be 3-120 characters")
    private String fullName;

    @NotBlank(message = "Aadhaar number is required")
    @Pattern(regexp = "\\d{12}", message = "Aadhaar number must be 12 digits")
    private String aadhaarNumber;

    @NotBlank(message = "Pension scheme is required")
    @Size(max = 80, message = "Pension scheme must be at most 80 characters")
    private String pensionScheme;

    @NotBlank(message = "State is required")
    @Size(max = 60, message = "State must be at most 60 characters")
    private String state;

    private boolean active;

    private PensionerStatus status;

    private LocalDate startDate;

    private Integer yearsReceiving;

    private Integer monthsReceiving;

    private Integer pensionAmount;

    private Integer totalPensionReceived;

    private String bankName;

    private String accountNumber;

    private LocalDate lastVerificationDate;

    private String mobileNumber;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAadhaarNumber() {
        return aadhaarNumber;
    }

    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }

    public String getPensionScheme() {
        return pensionScheme;
    }

    public void setPensionScheme(String pensionScheme) {
        this.pensionScheme = pensionScheme;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public PensionerStatus getStatus() {
        return status;
    }

    public void setStatus(PensionerStatus status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Integer getYearsReceiving() {
        return yearsReceiving;
    }

    public void setYearsReceiving(Integer yearsReceiving) {
        this.yearsReceiving = yearsReceiving;
    }

    public Integer getMonthsReceiving() {
        return monthsReceiving;
    }

    public void setMonthsReceiving(Integer monthsReceiving) {
        this.monthsReceiving = monthsReceiving;
    }

    public Integer getPensionAmount() {
        return pensionAmount;
    }

    public void setPensionAmount(Integer pensionAmount) {
        this.pensionAmount = pensionAmount;
    }

    public Integer getTotalPensionReceived() {
        return totalPensionReceived;
    }

    public void setTotalPensionReceived(Integer totalPensionReceived) {
        this.totalPensionReceived = totalPensionReceived;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public LocalDate getLastVerificationDate() {
        return lastVerificationDate;
    }

    public void setLastVerificationDate(LocalDate lastVerificationDate) {
        this.lastVerificationDate = lastVerificationDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
