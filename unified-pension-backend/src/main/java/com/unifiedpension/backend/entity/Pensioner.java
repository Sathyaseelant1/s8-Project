package com.unifiedpension.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pensioners")
public class Pensioner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String aadhaarNumber;

    @Column(nullable = false)
    private String pensionScheme;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private boolean active;

    @Enumerated(EnumType.STRING)
    private PensionerStatus status = PensionerStatus.PENDING;

    @Column
    private java.time.LocalDate startDate;

    @Column(nullable = false)
    private int yearsReceiving;

    @Column(nullable = false)
    private int monthsReceiving;

    @Column(nullable = false)
    private int pensionAmount;

    @Column(nullable = false)
    private int totalPensionReceived;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String accountNumber;

    @Column
    private java.time.LocalDate lastVerificationDate;

    @Column(nullable = false)
    private String mobileNumber;

    // Constructors
    public Pensioner() {}

    public Pensioner(
            String fullName,
            String aadhaarNumber,
            String pensionScheme,
            String state,
            boolean active,
            PensionerStatus status,
            java.time.LocalDate startDate,
            int yearsReceiving,
            int monthsReceiving,
            int pensionAmount,
            int totalPensionReceived,
            String bankName,
            String accountNumber,
            java.time.LocalDate lastVerificationDate,
            String mobileNumber
    ) {
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

    // Getters & Setters
    public Long getId() {
        return id;
    }

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

    public java.time.LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(java.time.LocalDate startDate) {
        this.startDate = startDate;
    }

    public int getYearsReceiving() {
        return yearsReceiving;
    }

    public void setYearsReceiving(int yearsReceiving) {
        this.yearsReceiving = yearsReceiving;
    }

    public int getMonthsReceiving() {
        return monthsReceiving;
    }

    public void setMonthsReceiving(int monthsReceiving) {
        this.monthsReceiving = monthsReceiving;
    }

    public int getPensionAmount() {
        return pensionAmount;
    }

    public void setPensionAmount(int pensionAmount) {
        this.pensionAmount = pensionAmount;
    }

    public int getTotalPensionReceived() {
        return totalPensionReceived;
    }

    public void setTotalPensionReceived(int totalPensionReceived) {
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

    public java.time.LocalDate getLastVerificationDate() {
        return lastVerificationDate;
    }

    public void setLastVerificationDate(java.time.LocalDate lastVerificationDate) {
        this.lastVerificationDate = lastVerificationDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
}
