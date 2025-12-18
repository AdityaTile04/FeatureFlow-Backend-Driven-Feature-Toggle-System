package com.project.backend.service.impl;

import com.project.backend.model.FeatureFlag;
import com.project.backend.repository.FeatureFlagRepository;
import com.project.backend.service.FeatureFlagService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureFlagServiceImpl implements FeatureFlagService {

    private final FeatureFlagRepository featureFlagRepository;

   public FeatureFlagServiceImpl(FeatureFlagRepository featureFlagRepository) {
       this.featureFlagRepository = featureFlagRepository;
   }


    @Override
    public FeatureFlag createFeatureFlag(FeatureFlag featureFlag) {
        return featureFlagRepository.save( featureFlag );
    }

    @Override
    public List<FeatureFlag> getAllFeatureFlags() {
        return featureFlagRepository.findAll();
    }

    @Override
    public FeatureFlag toggleFeatureFlag(Long id) {
        FeatureFlag featureFlag = featureFlagRepository.findById( id )
                .orElseThrow(() -> new RuntimeException("Flag not found"));

        featureFlag.setEnabled( !featureFlag.isEnabled() );
        return featureFlagRepository.save( featureFlag );
    }
}
