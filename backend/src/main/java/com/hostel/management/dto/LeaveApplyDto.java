package com.hostel.management.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class LeaveApplyDto {
    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "From Date is required")
    @FutureOrPresent(message = "From Date must be in the present or future")
    private LocalDate fromDate;

    @NotNull(message = "To Date is required")
    private LocalDate toDate;

    @NotBlank(message = "Reason is required")
    private String reason;
}
