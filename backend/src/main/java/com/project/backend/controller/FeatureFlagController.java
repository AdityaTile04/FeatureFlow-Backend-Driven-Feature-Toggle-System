package com.project.backend.controller;

import com.project.backend.dto.FeatureFlagRequestDTO;
import com.project.backend.dto.FeatureFlagResponseDTO;
import com.project.backend.model.FeatureFlag;
import com.project.backend.service.FeatureFlagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/flags")
@CrossOrigin(origins = "http://localhost:5173")
public class FeatureFlagController {

    private final FeatureFlagService featureFlagService;

    public FeatureFlagController(FeatureFlagService featureFlagService) {
        this.featureFlagService = featureFlagService;
    }

    @PostMapping
    public ResponseEntity<FeatureFlagResponseDTO> createFeatureFlag(
            @RequestBody FeatureFlagRequestDTO dto) {

        FeatureFlag savedFlag = featureFlagService.createFeatureFlag(dto);

        FeatureFlagResponseDTO response = new FeatureFlagResponseDTO(
                savedFlag.getId(),
                savedFlag.getName(),
                savedFlag.isEnabled(),
                savedFlag.getEnvironment()
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FeatureFlagResponseDTO>> getAllFlags() {

        List<FeatureFlagResponseDTO> response = featureFlagService
                .getAllFeatureFlags()
                .stream()
                .map(flag -> new FeatureFlagResponseDTO(
                        flag.getId(),
                        flag.getName(),
                        flag.isEnabled(),
                        flag.getEnvironment()
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<FeatureFlagResponseDTO> toggleFeatureFlag(
            @PathVariable Long id) {

        FeatureFlag updatedFlag = featureFlagService.toggleFeatureFlag(id);

        FeatureFlagResponseDTO response = new FeatureFlagResponseDTO(
                updatedFlag.getId(),
                updatedFlag.getName(),
                updatedFlag.isEnabled(),
                updatedFlag.getEnvironment()
        );

        return ResponseEntity.ok(response);
    }
}
