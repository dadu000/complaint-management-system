package com.smartfacility.complaint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.smartfacility.complaint.entity.Complaint;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUserId(Long userId);
}
