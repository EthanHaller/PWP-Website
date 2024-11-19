package com.uvapwp.members.controller;

import com.uvapwp.members.service.MembersService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/members")
public class MembersController {

    private final MembersService membersService;

    public MembersController(MembersService membersService) {
        this.membersService = membersService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public Map<String, Object> getMembers() throws Exception {
        return membersService.getMembers();
    }
}
