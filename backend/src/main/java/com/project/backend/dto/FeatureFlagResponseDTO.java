package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeatureFlagResponseDTO {
    private Long id;
    private String name;
    private Boolean enabled;
    private String environment;
}
