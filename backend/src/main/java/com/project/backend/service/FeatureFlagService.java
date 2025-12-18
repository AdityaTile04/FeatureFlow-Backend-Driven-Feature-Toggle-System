package com.project.backend.service;

import com.project.backend.dto.FeatureFlagRequestDTO;
import com.project.backend.model.FeatureFlag;

import java.util.List;

public interface FeatureFlagService {
    FeatureFlag createFeatureFlag(FeatureFlagRequestDTO dto);

    List<FeatureFlag> getAllFeatureFlags();

    FeatureFlag toggleFeatureFlag(Long id);
}
