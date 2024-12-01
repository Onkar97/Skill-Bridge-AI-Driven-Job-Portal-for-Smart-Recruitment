package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.JobApplicationRequest;
import edu.neu.csye6200.dto.NotificationRequest;
import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.entity.NotificationEntity;
import edu.neu.csye6200.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public void saveJobApplication(JobApplication jobApplication) {
        jobApplicationRepository.save(jobApplication);
    }
}