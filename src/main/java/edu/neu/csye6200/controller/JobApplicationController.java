package edu.neu.csye6200.controller;

import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.repository.JobApplicationRepository;
import edu.neu.csye6200.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/job-application")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "uploads/"; // Directory where resumes will be stored

    @PostMapping
    public ResponseEntity<String> applyForJob(
            @RequestParam("user_id") Long userId,
            @RequestParam("resume_file") MultipartFile resumeFile) {

        // Check if user exists
        UserEntity user = userRepository.findById(Math.toIntExact(userId)).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User with the given ID not found.");
        }

        // Validate and store the resume file
        try {
            // Create a unique file name
            String fileName = UUID.randomUUID().toString() + "_" + resumeFile.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, resumeFile.getBytes()); // Store the file

            // Create a new JobApplication entity
            JobApplication jobApplication = new JobApplication();
            jobApplication.setUser(user); // Set the user who is applying
            jobApplication.setResumePath(path.toString()); // Store the resume file path

            // Save the JobApplication to the database
            jobApplicationRepository.save(jobApplication);

            return ResponseEntity.ok("Job application submitted successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error while submitting job application: " + e.getMessage());
        }
    }
}
