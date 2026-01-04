package com.smartfacility.complaint.service;

import java.util.List;

import com.smartfacility.complaint.entity.User;
import com.smartfacility.complaint.exception.ResourceNotFoundException;
import com.smartfacility.complaint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.smartfacility.complaint.entity.Complaint;
import com.smartfacility.complaint.repository.ComplaintRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    public Complaint saveComplaint(Complaint complaint) {

        // 1️⃣ Get logged-in user's email from JWT
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        // 2️⃣ Fetch user from DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Logged-in user not found"));

        // 3️⃣ Attach user & status
        complaint.setUser(user);
        complaint.setStatus("OPEN");

        // 4️⃣ Save complaint
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public List<Complaint> getComplaintsByUserId(Long userId) {
        return complaintRepository.findByUserId(userId);
    }

    public Complaint updateComplaintStatus(Long complaintId, String status) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Complaint not found with id " + complaintId));

        complaint.setStatus(status);
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(Long id) {
        complaintRepository.deleteById(id);
    }
}
