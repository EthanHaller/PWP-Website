package com.uvapwp.members.controller;

import com.uvapwp.members.service.MembersService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/members")
@CrossOrigin(origins = "http://localhost:5173, https://uvapwp.com")
public class MembersController {

    private final MembersService membersService;

    public MembersController(MembersService membersService) {
        this.membersService = membersService;
    }

    @GetMapping
    public Map<String, Object> getMembers() throws Exception {
        return membersService.getMembers();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMember(@RequestPart String name,
                                       @RequestPart(required = false) String execRole,
                                       @RequestPart MultipartFile headshot) throws Exception {
        try {
            membersService.addMember(name, execRole, headshot);
            return ResponseEntity.ok("Member added successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMember(@PathVariable String id,
                                          @RequestPart(required = false) String name,
                                          @RequestPart(required = false) String execRole,
                                          @RequestPart(required = false) MultipartFile headshot) throws Exception {
        try {
            membersService.updateMember(id, name, execRole, headshot);
            return ResponseEntity.ok("Member updated successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable String id) {
        try {
            membersService.deleteMember(id);
            return ResponseEntity.ok("Member deleted successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping("/updateRoleOrder")
    public ResponseEntity<?> updateRoleOrder(@RequestBody Map<String, List<String>> data) {
        List<String> roles = data.get("roles");
        try {
            membersService.updateRoleOrder(roles);
            return ResponseEntity.ok("Role order updated successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
