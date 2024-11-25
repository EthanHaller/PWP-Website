package com.uvapwp.countries.controller;

import com.uvapwp.countries.service.CountriesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "https://uvapwp.com")
public class CountriesController {

    private final CountriesService countriesService;

    public CountriesController(CountriesService countriesService) {
        this.countriesService = countriesService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCountries(@RequestBody Map<String, List<String>> countriesData) {
        try {
            List<String> countries = countriesData.get("countries");
            countriesService.addCountries(countries);
            return ResponseEntity.status(201).body("Countries added successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getCountries() {
        try {
            Map<String, Object> countries = countriesService.getCountries();
            return ResponseEntity.ok(countries);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCountry(@PathVariable String id) {
        try {
            countriesService.deleteCountry(id);
            return ResponseEntity.ok("Country deleted successfully");
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
