package com.smartfacility.complaint.controller;

import com.smartfacility.complaint.dto.LoginRequest;
import com.smartfacility.complaint.dto.RegisterRequest;
import com.smartfacility.complaint.entity.User;
import com.smartfacility.complaint.repository.UserRepository;
import com.smartfacility.complaint.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // ✅ SINGLE constructor
    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // ✅ FIXED
        user.setBuilding(request.getBuilding());
        user.setRoomNumber(request.getRoomNumber());

        // ✅ Role handling
        if (request.getRole() == null || request.getRole().isEmpty()) {
            user.setRole("USER");
        } else {
            user.setRole(request.getRole());
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Optional<User> userOpt =
                userRepository.findByEmail(loginRequest.getEmail().trim());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        User user = userOpt.get();

        if (user.getPassword() == null ||
                !user.getPassword().equals(loginRequest.getPassword().trim())) {

            return ResponseEntity.status(401)
                    .body("Invalid email or password");
        }

        // ✅ Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
                Map.of(
                        "token", token,
                        "user", user
                )
        );
    }

    // ================= FORGOT PASSWORD =================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");
        String newPassword = request.get("password");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body("Email not found");
        }

        User user = userOpt.get();
        user.setPassword(newPassword); // later → BCrypt
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }
}
