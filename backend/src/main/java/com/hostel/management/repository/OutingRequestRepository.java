package com.hostel.management.repository;

import com.hostel.management.entity.OutingRequest;
import com.hostel.management.entity.Student;
import com.hostel.management.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutingRequestRepository extends JpaRepository<OutingRequest, Long> {
    List<OutingRequest> findByStudent(Student student);

    List<OutingRequest> findByStatus(RequestStatus status);
}
