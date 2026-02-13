package com.hostel.management.service;

import com.hostel.management.entity.*;
import com.hostel.management.enums.RequestStatus;
import com.hostel.management.exception.ResourceNotFoundException;
import com.hostel.management.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WardenService {

    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final OnDutyRequestRepository onDutyRequestRepository;
    private final OutingRequestRepository outingRequestRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Map<String, List<?>> getPendingRequests() {
        Map<String, List<?>> pendingRequests = new HashMap<>();
        pendingRequests.put("leaveRequests", leaveRequestRepository.findByStatus(RequestStatus.PENDING));
        pendingRequests.put("odRequests", onDutyRequestRepository.findByStatus(RequestStatus.PENDING));
        pendingRequests.put("outingRequests", outingRequestRepository.findByStatus(RequestStatus.PENDING));
        return pendingRequests;
    }

    public LeaveRequest updateLeaveStatus(Long id, RequestStatus status) {
        LeaveRequest request = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave Request not found"));
        request.setStatus(status);
        return leaveRequestRepository.save(request);
    }

    public OnDutyRequest updateODStatus(Long id, RequestStatus status) {
        OnDutyRequest request = onDutyRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("OD Request not found"));
        request.setStatus(status);
        return onDutyRequestRepository.save(request);
    }

    public OutingRequest updateOutingStatus(Long id, RequestStatus status) {
        OutingRequest request = outingRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Outing Request not found"));
        request.setStatus(status);
        return outingRequestRepository.save(request);
    }

    public List<Attendance> getAttendanceReport(LocalDate date) {
        return attendanceRepository.findByDate(date);
    }
}
