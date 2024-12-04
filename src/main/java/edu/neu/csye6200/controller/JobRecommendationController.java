package edu.neu.csye6200.controller;

import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.service.JobRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-recommendations")
@CrossOrigin(origins = "http://localhost:3000")
public class JobRecommendationController {

    @Autowired
    private JobRecommendationService jobRecommendationService;

    @GetMapping("/recommend")
    public ResponseEntity<List<Job>> getJobRecommendations(@RequestParam Long userId) {
        try {
            List<Job> recommendedJobs = jobRecommendationService.recommendJobs(userId);
            return ResponseEntity.ok(recommendedJobs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Error in fetching recommendations
        }
    }
}

