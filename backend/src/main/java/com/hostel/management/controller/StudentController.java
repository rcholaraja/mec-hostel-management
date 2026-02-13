package com.hostel.management.controller;

import com.hostel.management.dto.*;
import com.hostel.management.entity.*;
import com.hostel.management.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    @PostMapping("/students")
    public ResponseEntity<Student> registerStudent(@Valid @RequestBody StudentDto dto) {
        return new ResponseEntity<>(studentService.registerStudent(dto), HttpStatus.CREATED);
    }

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PostMapping("/attendance/mark")
    public ResponseEntity<Attendance> markAttendance(@Valid @RequestBody AttendanceMarkDto dto) {
        return new ResponseEntity<>(studentService.markAttendance(dto), HttpStatus.CREATED);
    }

    @PostMapping("/leave/apply")
    public ResponseEntity<LeaveRequest> applyLeave(@Valid @RequestBody LeaveApplyDto dto) {
        return new ResponseEntity<>(studentService.applyLeave(dto), HttpStatus.CREATED);
    }

    @PostMapping("/od/apply")
    public ResponseEntity<OnDutyRequest> applyOD(@Valid @RequestBody ODApplyDto dto) {
        return new ResponseEntity<>(studentService.applyOD(dto), HttpStatus.CREATED);
    }

    @PostMapping("/outing/apply")
    public ResponseEntity<OutingRequest> applyOuting(@Valid @RequestBody OutingApplyDto dto) {
        return new ResponseEntity<>(studentService.applyOuting(dto), HttpStatus.CREATED);
    }

    @GetMapping("/student/{id}/history")
    public ResponseEntity<RequestHistoryDto> getStudentHistory(@PathVariable("id") Long id) {
        return ResponseEntity.ok(studentService.getStudentHistory(id));
    }
}
