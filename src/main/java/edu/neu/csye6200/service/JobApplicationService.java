package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.JobApplicationRequest;
import edu.neu.csye6200.dto.JobApplicationResponse;
import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.repository.JobApplicationRepository;
import edu.neu.csye6200.repository.JobRepository;
import edu.neu.csye6200.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class JobApplicationService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository jobApplicationRepository;

    private static final String UPLOAD_DIR = "./uploads";

    public JobApplicationService(UserRepository userRepository, JobRepository jobRepository, JobApplicationRepository jobApplicationRepository) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobApplicationResponse processJobApplication(JobApplicationRequest request) throws Exception {
        // Validate user existence
        UserEntity user = userRepository.findById(Math.toIntExact(request.getUserId()))
                .orElseThrow(() -> new IllegalArgumentException("User with the given ID not found."));

        // Validate job existence
        Job job = jobRepository.findByJobId(request.getJobId())
                .orElseThrow(() -> new IllegalArgumentException("Job with the given ID not found."));

        // Validate and store the resume file
        String fileName = UUID.randomUUID() + "_" + request.getResumeFile().getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, request.getResumeFile().getBytes());

        // Create and save the job application
        JobApplication jobApplication = new JobApplication();
        jobApplication.setUser(user);
        jobApplication.setResumePath(path.toString());
        jobApplication.setJob(job);
        jobApplication.setDateApplied(LocalDateTime.now());

        jobApplicationRepository.save(jobApplication);

        // Return the response with user's email
        return new JobApplicationResponse(
                "Job application submitted successfully!",
                path.toString(),
                job.getId(),
                user.getEmail() // Include user email
        );
    }

    public List<JobApplicationResponse> getAllJobsApplications() {

        List<JobApplication> jobApplicationList = jobApplicationRepository.findAll();

        return jobApplicationList.stream()
                .map(job -> new JobApplicationResponse(
                        "Job application retrieved successfully!",
                        job.getResumePath(),
                        job.getJob().getId(),
                        job.getUser().getEmail()
                ))
                .toList();
    }



    public JobApplication findByUserId(Long userId) {
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserId(userId);

        if (jobApplications.isEmpty()) {
            throw new IllegalArgumentException("No job application found for user ID: " + userId);
        }

        return jobApplications.get(0);
    }


    public List<JobApplicationResponse> getAllJobsApplicationsUsingJobId(Long jobId) {

        List<JobApplication> jobApplicationList = jobApplicationRepository.findByJobId(jobId);

        return jobApplicationList.stream()
                .map(jobApplication -> new JobApplicationResponse(
                        "Job application retrieved successfully!",
                        jobApplication.getResumePath(),
                        jobApplication.getJob().getId(),
                        jobApplication.getUser().getEmail()
                ))
                .toList();
    }
}
