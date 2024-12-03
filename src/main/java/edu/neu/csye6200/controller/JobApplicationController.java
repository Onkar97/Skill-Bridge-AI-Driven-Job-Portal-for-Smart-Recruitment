package edu.neu.csye6200.controller;
import edu.neu.csye6200.dto.JobApplicationResponse;
import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.repository.JobRepository;
import edu.neu.csye6200.repository.UserRepository;
import edu.neu.csye6200.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/job-application")
@CrossOrigin(origins = "http://localhost:3000")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    private static final String UPLOAD_DIR = "uploads/"; // Directory where resumes will be stored

    @PostMapping
    public ResponseEntity<JobApplicationResponse> applyForJob(
            @RequestParam("user_id") Long userId,
            @RequestParam("resume_file") MultipartFile resumeFile,
            @RequestParam("job_id") Long jobId,
            @RequestParam("dateApplied") LocalDateTime date) {

        // Check if user exists
        UserEntity user = userRepository.findById(Math.toIntExact(userId)).orElse(null);
        Job job = jobRepository.findByJobId(jobId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(new JobApplicationResponse("User with the given ID not found.", null, null));
        }

        if (job == null) {
            return ResponseEntity.badRequest().body(new JobApplicationResponse("Job with the given ID not found.", null, null));
        }

        // Validate and store the resume file
        try {
            // Create a unique file name
            String fileName = UUID.randomUUID().toString() + "_" + resumeFile.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, resumeFile.getBytes()); // Store the file

            // Create a new JobApplication entity and save the application to the database
            JobApplication jobApplication = new JobApplication();
            jobApplication.setUser(user); // Set the user who is applying
            jobApplication.setResumePath(path.toString());
            jobApplication.setJob(job.getId());
            jobApplication.setDateApplied(date); // Store the resume file path

            // Save the JobApplication to the database
            jobApplicationService.saveJobApplication(jobApplication);

            // Return the response with message and resume path
            JobApplicationResponse response = new JobApplicationResponse("Job application submitted successfully!", path.toString(), job.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new JobApplicationResponse("Error while submitting job application: " + e.getMessage(), null, null));
        }
    }
}
