package com.hostel.management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentDto {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Roll Number is required")
    private String rollNumber;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Year is required")
    private String year;

    @NotBlank(message = "Room Number is required")
    private String roomNumber;

    @NotBlank(message = "Hostel Block is required")
    private String hostelBlock;
}
