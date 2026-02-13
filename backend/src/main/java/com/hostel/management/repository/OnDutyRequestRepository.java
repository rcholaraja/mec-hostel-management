package com.hostel.management.repository;

import com.hostel.management.entity.OnDutyRequest;
import com.hostel.management.entity.Student;
import com.hostel.management.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnDutyRequestRepository extends JpaRepository<OnDutyRequest, Long> {
    List<OnDutyRequest> findByStudent(Student student);

    List<OnDutyRequest> findByStatus(RequestStatus status);
}
