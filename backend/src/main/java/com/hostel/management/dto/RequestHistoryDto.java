package com.hostel.management.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RequestHistoryDto {
    private List<?> leaveRequests;
    private List<?> odRequests;
    private List<?> outingRequests;
    private List<?> attendanceRecords;
}
