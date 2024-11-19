package com.uvapwp.recruitment.controller;

import com.uvapwp.recruitment.service.RecruitmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/recruitment")
@CrossOrigin(origins = "http://localhost:5173, https://uvapwp.com")
public class RecruitmentController {

    private final RecruitmentService recruitmentService;

    public RecruitmentController(RecruitmentService recruitmentService) {
        this.recruitmentService = recruitmentService;
    }

    @GetMapping
    public ResponseEntity<?> getRecruitmentInfo() {
        try {
            Map<String, Object> recruitmentInfo = recruitmentService.getRecruitmentInfo();
            return ResponseEntity.ok(recruitmentInfo);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateRecruitmentInfo(@RequestBody Map<String, Object> recruitmentData) {
        try {
            Map<String, Object> updatedInfo = recruitmentService.updateRecruitmentInfo(recruitmentData);
            return ResponseEntity.status(201).body(updatedInfo);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
