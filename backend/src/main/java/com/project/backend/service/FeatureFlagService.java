package com.project.backend.service;

import com.project.backend.model.FeatureFlag;

import java.util.List;

public interface FeatureFlagService {
    FeatureFlag createFeatureFlag(FeatureFlag featureFlag);

    List<FeatureFlag> getAllFeatureFlags();

    FeatureFlag toggleFeatureFlag(Long id);
}
