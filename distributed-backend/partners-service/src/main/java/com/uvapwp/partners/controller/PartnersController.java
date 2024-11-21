package com.uvapwp.partners.controller;

import com.uvapwp.partners.service.PartnersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/partners")
@CrossOrigin(origins = "http://localhost:5173, https://uvapwp.com")
public class PartnersController {

    private final PartnersService partnersService;

    public PartnersController(PartnersService partnersService) {
        this.partnersService = partnersService;
    }

    @GetMapping
    public Map<String, Object> getPartners() throws Exception {
        return partnersService.getPartners();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addPartner(@RequestPart String name,
                                        @RequestPart MultipartFile image) {
        try {
            partnersService.addPartner(name, image);
            return ResponseEntity.ok("Partner added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePartner(@PathVariable String id,
                                           @RequestPart(required = false) String name,
                                           @RequestPart(required = false) MultipartFile image) {
        try {
            partnersService.updatePartner(id, name, image);
            return ResponseEntity.ok("Partner updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePartner(@PathVariable String id) {
        try {
            partnersService.deletePartner(id);
            return ResponseEntity.ok("Partner deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
