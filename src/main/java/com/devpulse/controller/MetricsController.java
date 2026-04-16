package com.devpulse.controller;

import com.devpulse.service.MetricsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
public class MetricsController {

    private final MetricsService metricsService;

    public MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }

    @GetMapping
    public Map<String, Object> getMetrics() {
        return metricsService.collectMetrics();
    }
}
