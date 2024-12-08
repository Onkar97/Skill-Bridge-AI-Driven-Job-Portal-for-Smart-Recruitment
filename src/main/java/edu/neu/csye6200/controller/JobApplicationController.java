package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.JobApplicationRequest;
import edu.neu.csye6200.dto.JobApplicationResponse;
import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/job-application")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    /**
     * Submit a job application
     */
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<JobApplicationResponse> submitJobApplication(
            @ModelAttribute JobApplicationRequest jobApplicationRequest) {
        try {
            JobApplicationResponse response = jobApplicationService.processJobApplication(jobApplicationRequest);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new JobApplicationResponse("Bad Request: " + e.getMessage(), null, null, null));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new JobApplicationResponse("Server Error: " + e.getMessage(), null, null, null));
        }
    }

    /**
     * Retrieve all job applications
     */
    @GetMapping("/all")
    public ResponseEntity<?> getAllJobApplications() {
        try {
            List<JobApplicationResponse> jobResponses = jobApplicationService.getAllJobsApplications();
            if (jobResponses.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(jobResponses);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving job applications: " + e.getMessage());
        }
    }

    @GetMapping("/allByJobId")
    public ResponseEntity<?> getAllJobApplicationsById(@RequestParam("jobId") Long jobId) {
        try {
            List<JobApplicationResponse> jobResponses = jobApplicationService.getAllJobsApplicationsUsingJobId(jobId);
            if (jobResponses.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(jobResponses);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving job applications: " + e.getMessage());
        }
    }

    /*
     * Download resume by userId
     */
    @GetMapping("/resumes/user")
    public ResponseEntity<?> getResumeByUserId(@RequestParam("userId") Long userId) {
        try {
            // Fetch job application by user ID
            JobApplication application = jobApplicationService.findByUserId(userId);

            if (application == null) {
                return ResponseEntity.status(404).body("No job application found for user ID: " + userId);
            }

            // Validate resume path
            String resumePath = application.getResumePath();
            if (resumePath == null || resumePath.isEmpty()) {
                return ResponseEntity.status(404).body("Resume file path is missing for user ID: " + userId);
            }

            Path filePath = Paths.get(resumePath);

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(404).body("Resume file not found at path: " + resumePath);
            }

            Resource fileResource = new UrlResource(filePath.toUri());

            if (!fileResource.isReadable()) {
                return ResponseEntity.status(500).body("Resume file is unreadable at path: " + resumePath);
            }

            // Return file as downloadable
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath.getFileName() + "\"")
                    .body(fileResource);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Application not found: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Log full stack trace for debugging
            return ResponseEntity.status(500).body("Unexpected Server Error: " + e.getMessage());
        }
    }

}