package com.hostel.management.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ODApplyDto {
    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "OD Date is required")
    @FutureOrPresent(message = "OD Date must be in the present or future")
    private LocalDate odDate;

    @NotBlank(message = "Purpose is required")
    private String purpose;
}
