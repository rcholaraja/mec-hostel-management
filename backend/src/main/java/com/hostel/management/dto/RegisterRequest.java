package com.hostel.management.dto;

import com.hostel.management.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {
    // Auth credentials
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;

    // Student fields (required when role = STUDENT)
    private String name;
    private String rollNumber;
    private String department;
    private String year;
    private String roomNumber;
    private String hostelBlock;
}
