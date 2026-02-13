package com.hostel.management.repository;

import com.hostel.management.entity.LeaveRequest;
import com.hostel.management.entity.Student;
import com.hostel.management.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByStudent(Student student);

    List<LeaveRequest> findByStatus(RequestStatus status);

    @Query("SELECT l FROM LeaveRequest l WHERE l.student = :student " +
            "AND l.status = 'APPROVED' " +
            "AND ((l.fromDate <= :toDate) AND (l.toDate >= :fromDate))")
    List<LeaveRequest> findOverlappingLeave(@Param("student") Student student,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate);
}
