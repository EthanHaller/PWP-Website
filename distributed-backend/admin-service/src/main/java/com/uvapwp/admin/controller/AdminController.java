package com.uvapwp.admin.controller;

import com.uvapwp.admin.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173, https://uvapwp.com")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/list-users")
    public ResponseEntity<?> listUsers() {
        try {
            List<Object> users = adminService.listUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error listing users", "message", e.getMessage()));
        }
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@RequestBody Map<String, String> userRequest) {
        try {
            Map<String, Object> response = adminService.addUser(userRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error creating user", "message", e.getMessage()));
        }
    }

    @DeleteMapping("/delete-user/{uid}")
    public ResponseEntity<?> deleteUser(@PathVariable String uid) {
        try {
            adminService.deleteUser(uid);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error deleting user", "message", e.getMessage()));
        }
    }
}
