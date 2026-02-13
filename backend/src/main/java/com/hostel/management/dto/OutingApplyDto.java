package com.hostel.management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class OutingApplyDto {
    @NotNull(message = "Student ID is required")
    private Long studentId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Out Time is required")
    private LocalTime outTime;

    @NotNull(message = "Return Time is required")
    private LocalTime returnTime;

    @NotBlank(message = "Purpose is required")
    private String purpose;
}
