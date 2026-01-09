package com.smartfacility.complaint.controller;

import com.smartfacility.complaint.entity.Complaint;
import com.smartfacility.complaint.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import com.smartfacility.complaint.entity.User;
import com.smartfacility.complaint.repository.UserRepository;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping
    public Complaint createComplaint(@Valid @RequestBody Complaint complaint) {
        System.out.println("CREATE COMPLAINT HIT");
        return complaintService.saveComplaint(complaint);
    }



    @GetMapping
    public List<Complaint> getComplaints(Authentication authentication) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().equals("ADMIN")) {
            return complaintService.getAllComplaints();
        } else {
            return complaintService.getComplaintsByUserId(user.getId());
        }
    }


    @GetMapping("/user/{userId}")
    public List<Complaint> getComplaintsByUser(@PathVariable Long userId) {
        return complaintService.getComplaintsByUserId(userId);
    }

    @PutMapping("/{id}/status")
    public Complaint updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        return complaintService.updateComplaintStatus(id, request.get("status"));
    }

    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return "Complaint deleted successfully";
    }
}
