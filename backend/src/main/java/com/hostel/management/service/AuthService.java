package com.hostel.management.service;

import com.hostel.management.dto.AuthResponse;
import com.hostel.management.dto.LoginRequest;
import com.hostel.management.dto.RegisterRequest;
import com.hostel.management.entity.Student;
import com.hostel.management.entity.User;
import com.hostel.management.enums.UserRole;
import com.hostel.management.exception.BadRequestException;
import com.hostel.management.repository.StudentRepository;
import com.hostel.management.repository.UserRepository;
import com.hostel.management.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username '" + request.getUsername() + "' is already taken");
        }

        Long studentId = null;

        if (request.getRole() == UserRole.STUDENT) {
            // Validate student fields
            if (request.getName() == null || request.getName().isBlank()) {
                throw new BadRequestException("Name is required for student registration");
            }
            if (request.getRollNumber() == null || request.getRollNumber().isBlank()) {
                throw new BadRequestException("Roll number is required for student registration");
            }
            if (studentRepository.findByRollNumber(request.getRollNumber()).isPresent()) {
                throw new BadRequestException(
                        "Student with roll number " + request.getRollNumber() + " already exists");
            }

            Student student = Student.builder()
                    .name(request.getName())
                    .rollNumber(request.getRollNumber())
                    .department(request.getDepartment())
                    .year(request.getYear())
                    .roomNumber(request.getRoomNumber())
                    .hostelBlock(request.getHostelBlock())
                    .build();
            student = studentRepository.save(student);
            studentId = student.getId();
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .studentId(studentId)
                .build();
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .username(user.getUsername())
                .studentId(studentId)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadRequestException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .role(user.getRole().name())
                .username(user.getUsername())
                .studentId(user.getStudentId())
                .build();
    }
}
