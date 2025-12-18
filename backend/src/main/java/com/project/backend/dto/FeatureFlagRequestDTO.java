package com.project.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FeatureFlagRequestDTO {

    @NotBlank(message = "feature name cannot be empty")
    private String name;

    @NotNull(message = "Enable status is required")
    private boolean enabled;

    @NotBlank(message = "Environment is required")
    private String environment;

}
