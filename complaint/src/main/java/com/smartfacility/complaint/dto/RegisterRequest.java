//package com.smartfacility.complaint.dto;
//
//public class RegisterRequest {
//
//    private String name;
//    private String email;
//    private String password;
//    private String role;
//    private String building;
//    private String roomNumber;
//
//    // ===== Getters & Setters =====
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public String getBuilding() {
//        return building;
//    }
//
//    public void setBuilding(String building) {
//        this.building = building;
//    }
//
//    public String getRoomNumber() {
//        return roomNumber;
//    }
//
//    public void setRoomNumber(String roomNumber) {
//        this.roomNumber = roomNumber;
//    }
//}
package com.smartfacility.complaint.dto;

public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private String role;
    private String building;
    private String roomNumber; // Ensure this is camelCase

    // ===== Getters & Setters =====

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }

    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
}
