package com.hostel.management.service;

import com.hostel.management.dto.AttendanceMarkDto;
import com.hostel.management.dto.LeaveApplyDto;
import com.hostel.management.dto.ODApplyDto;
import com.hostel.management.dto.OutingApplyDto;
import com.hostel.management.dto.RequestHistoryDto;
import com.hostel.management.dto.StudentDto;
import com.hostel.management.entity.Attendance;
import com.hostel.management.entity.LeaveRequest;
import com.hostel.management.entity.OnDutyRequest;
import com.hostel.management.entity.OutingRequest;
import com.hostel.management.entity.Student;
import com.hostel.management.enums.RequestStatus;
import com.hostel.management.exception.BadRequestException;
import com.hostel.management.exception.ResourceNotFoundException;
import com.hostel.management.repository.AttendanceRepository;
import com.hostel.management.repository.LeaveRequestRepository;
import com.hostel.management.repository.OnDutyRequestRepository;
import com.hostel.management.repository.OutingRequestRepository;
import com.hostel.management.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

        private final StudentRepository studentRepository;
        private final AttendanceRepository attendanceRepository;
        private final LeaveRequestRepository leaveRequestRepository;
        private final OnDutyRequestRepository onDutyRequestRepository;
        private final OutingRequestRepository outingRequestRepository;

        public Student registerStudent(StudentDto dto) {
                if (studentRepository.findByRollNumber(dto.getRollNumber()).isPresent()) {
                        throw new BadRequestException(
                                        "Student with roll number " + dto.getRollNumber() + " already exists");
                }
                Student student = Student.builder()
                                .name(dto.getName())
                                .rollNumber(dto.getRollNumber())
                                .department(dto.getDepartment())
                                .year(dto.getYear())
                                .roomNumber(dto.getRoomNumber())
                                .hostelBlock(dto.getHostelBlock())
                                .build();
                return studentRepository.save(student);
        }

        public List<Student> getAllStudents() {
                return studentRepository.findAll();
        }

        public Attendance markAttendance(AttendanceMarkDto dto) {
                Student student = studentRepository.findById(dto.getStudentId())
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                if (attendanceRepository.existsByStudentAndDate(student, LocalDate.now())) {
                        throw new BadRequestException("Attendance already marked for today");
                }

                Attendance attendance = Attendance.builder()
                                .student(student)
                                .date(LocalDate.now())
                                .status(dto.getStatus())
                                .build();
                return attendanceRepository.save(attendance);
        }

        public LeaveRequest applyLeave(LeaveApplyDto dto) {
                Student student = studentRepository.findById(dto.getStudentId())
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                // Check for overlapping leave
                List<LeaveRequest> overlapping = leaveRequestRepository.findOverlappingLeave(student, dto.getFromDate(),
                                dto.getToDate());
                if (!overlapping.isEmpty()) {
                        throw new BadRequestException("Leave request overlaps with an existing approved leave");
                }

                LeaveRequest request = LeaveRequest.builder()
                                .student(student)
                                .fromDate(dto.getFromDate())
                                .toDate(dto.getToDate())
                                .reason(dto.getReason())
                                .status(RequestStatus.PENDING)
                                .build();
                return leaveRequestRepository.save(request);
        }

        public OnDutyRequest applyOD(ODApplyDto dto) {
                Student student = studentRepository.findById(dto.getStudentId())
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                OnDutyRequest request = OnDutyRequest.builder()
                                .student(student)
                                .odDate(dto.getOdDate())
                                .purpose(dto.getPurpose())
                                .status(RequestStatus.PENDING)
                                .build();
                return onDutyRequestRepository.save(request);
        }

        public OutingRequest applyOuting(OutingApplyDto dto) {
                Student student = studentRepository.findById(dto.getStudentId())
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                OutingRequest request = OutingRequest.builder()
                                .student(student)
                                .date(dto.getDate())
                                .outTime(dto.getOutTime())
                                .returnTime(dto.getReturnTime())
                                .purpose(dto.getPurpose())
                                .status(RequestStatus.PENDING)
                                .build();
                return outingRequestRepository.save(request);
        }

        public RequestHistoryDto getStudentHistory(Long studentId) {
                Student student = studentRepository.findById(studentId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                return RequestHistoryDto.builder()
                                .leaveRequests(leaveRequestRepository.findByStudent(student))
                                .odRequests(onDutyRequestRepository.findByStudent(student))
                                .outingRequests(outingRequestRepository.findByStudent(student))
                                .attendanceRecords(attendanceRepository.findByStudent(student))
                                .build();
        }
}
