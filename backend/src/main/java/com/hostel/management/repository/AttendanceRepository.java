package com.hostel.management.repository;

import com.hostel.management.entity.Attendance;
import com.hostel.management.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    boolean existsByStudentAndDate(Student student, LocalDate date);

    List<Attendance> findByStudent(Student student);

    List<Attendance> findByDate(LocalDate date);
}
