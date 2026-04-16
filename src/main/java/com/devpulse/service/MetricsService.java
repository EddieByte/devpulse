package com.devpulse.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.lang.management.*;
import java.util.HashMap;
import java.util.Map;

@Service
public class MetricsService {

    private final SimpMessagingTemplate messagingTemplate;

    public MetricsService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedRate = 2000)
    public void pushMetrics() {
        messagingTemplate.convertAndSend("/topic/metrics", collectMetrics());
    }

    public Map<String, Object> collectMetrics() {
        OperatingSystemMXBean os = ManagementFactory.getOperatingSystemMXBean();
        MemoryMXBean memory = ManagementFactory.getMemoryMXBean();
        ThreadMXBean threads = ManagementFactory.getThreadMXBean();
        RuntimeMXBean runtime = ManagementFactory.getRuntimeMXBean();

        Map<String, Object> metrics = new HashMap<>();

        // CPU
        metrics.put("cpuLoad", os.getSystemLoadAverage());
        metrics.put("availableProcessors", os.getAvailableProcessors());
        metrics.put("osName", os.getName());
        metrics.put("osArch", os.getArch());
        metrics.put("osVersion", os.getVersion());

        // Heap memory
        metrics.put("heapUsed", memory.getHeapMemoryUsage().getUsed() / (1024 * 1024));
        metrics.put("heapMax", memory.getHeapMemoryUsage().getMax() / (1024 * 1024));
        metrics.put("heapCommitted", memory.getHeapMemoryUsage().getCommitted() / (1024 * 1024));

        // Non-heap memory
        metrics.put("nonHeapUsed", memory.getNonHeapMemoryUsage().getUsed() / (1024 * 1024));
        metrics.put("nonHeapCommitted", memory.getNonHeapMemoryUsage().getCommitted() / (1024 * 1024));

        // Threads
        metrics.put("threadCount", threads.getThreadCount());
        metrics.put("peakThreadCount", threads.getPeakThreadCount());
        metrics.put("daemonThreadCount", threads.getDaemonThreadCount());

        // JVM uptime
        metrics.put("uptimeSeconds", runtime.getUptime() / 1000);
        metrics.put("jvmName", runtime.getVmName());
        metrics.put("jvmVersion", runtime.getVmVersion());

        metrics.put("timestamp", System.currentTimeMillis());
        return metrics;
    }
}
