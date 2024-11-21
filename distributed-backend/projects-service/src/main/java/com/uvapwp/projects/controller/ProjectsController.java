package com.uvapwp.projects.controller;

import com.uvapwp.projects.service.ProjectsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:5173, https://uvapwp.com")
public class ProjectsController {

    private final ProjectsService projectsService;

    public ProjectsController(ProjectsService projectsService) {
        this.projectsService = projectsService;
    }

    @GetMapping
    public Map<String, Object> getProjects() throws Exception {
        return projectsService.getProjects();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProject(@RequestPart String title,
                                        @RequestPart String date,
                                        @RequestPart MultipartFile coverImage,
                                        @RequestPart MultipartFile presentation) throws Exception {
        try {
            projectsService.addProject(title, date, coverImage, presentation);
            return ResponseEntity.ok("Project added successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProject(@PathVariable String id,
                                           @RequestPart(required = false) String title,
                                           @RequestPart(required = false) String date,
                                           @RequestPart(required = false) MultipartFile coverImage,
                                           @RequestPart(required = false) MultipartFile presentation) throws Exception {
        try {
            projectsService.updateProject(id, title, date, coverImage, presentation);
            return ResponseEntity.ok("Project updated successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        try {
            projectsService.deleteProject(id);
            return ResponseEntity.ok("Project deleted successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
