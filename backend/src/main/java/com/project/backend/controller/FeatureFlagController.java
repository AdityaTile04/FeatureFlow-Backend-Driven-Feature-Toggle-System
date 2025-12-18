package com.project.backend.controller;

import com.project.backend.model.FeatureFlag;
import com.project.backend.service.impl.FeatureFlagServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flags")
@CrossOrigin(origins = "http://localhost:5173/")
public class FeatureFlagController {

    private final FeatureFlagServiceImpl featureFlagService;

    public FeatureFlagController(FeatureFlagServiceImpl featureFlagService) {
        this.featureFlagService = featureFlagService;
    }

    @PostMapping
    public ResponseEntity<FeatureFlag> createFeatureFlag(@RequestBody FeatureFlag featureFlag) {
        FeatureFlag createdFlag = featureFlagService.createFeatureFlag( featureFlag );
        return new ResponseEntity<>(createdFlag, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FeatureFlag>> getAllFlags() {
        List<FeatureFlag> getAllFlags = featureFlagService.getAllFeatureFlags();
        return ResponseEntity.ok(getAllFlags);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<FeatureFlag> toggleFeatureFlag(@PathVariable Long id) {
        FeatureFlag updatedFlag = featureFlagService.toggleFeatureFlag( id );
        return ResponseEntity.ok( updatedFlag );
    }

}
