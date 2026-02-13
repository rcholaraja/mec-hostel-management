package com.hostel.management.controller;

import com.hostel.management.entity.Attendance;
import com.hostel.management.entity.LeaveRequest;
import com.hostel.management.entity.OutingRequest;
import com.hostel.management.entity.OnDutyRequest;
import com.hostel.management.enums.RequestStatus;
import com.hostel.management.service.WardenService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/warden")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class WardenController {

    private final WardenService wardenService;

    @GetMapping("/pending-requests")
    public ResponseEntity<Map<String, List<?>>> getPendingRequests() {
        return ResponseEntity.ok(wardenService.getPendingRequests());
    }

    @PutMapping("/leave/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(@PathVariable("id") Long id) {
        return ResponseEntity.ok(wardenService.updateLeaveStatus(id, RequestStatus.APPROVED));
    }

    @PutMapping("/leave/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeave(@PathVariable("id") Long id) {
        return ResponseEntity.ok(wardenService.updateLeaveStatus(id, RequestStatus.REJECTED));
    }

    @PutMapping("/od/{id}/approve")
    public ResponseEntity<OnDutyRequest> approveOD(@PathVariable("id") Long id) {
        return ResponseEntity.ok(wardenService.updateODStatus(id, RequestStatus.APPROVED));
    }

    @PutMapping("/od/{id}/reject")
    public ResponseEntity<OnDutyRequest> rejectOD(@PathVariable("id") Long id) {
        return ResponseEntity.ok(wardenService.updateODStatus(id, RequestStatus.REJECTED));
    }

    @PutMapping("/outing/{id}/approve")
    public ResponseEntity<OutingRequest> approveOuting(@PathVariable("id") Long id) {
        return ResponseEntity.ok(wardenService.updateOutingStatus(id, RequestStatus.APPROVED));
    }

    @PutMapping("/outing/{id}/reject")
    public ResponseEntity<OutingRequest> rejectOuting(@PathVariable("id") Long id) {
        return ResponseEntity.ok(wardenService.updateOutingStatus(id, RequestStatus.REJECTED));
    }

    @GetMapping("/attendance-report")
    public ResponseEntity<List<Attendance>> getAttendanceReport(
            @RequestParam(name = "date", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(wardenService.getAttendanceReport(date));
    }
}
