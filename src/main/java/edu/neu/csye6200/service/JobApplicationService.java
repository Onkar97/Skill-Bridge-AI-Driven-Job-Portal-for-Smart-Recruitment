package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(JobApplicationRepository jobApplicationRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobApplication saveJobApplication(JobApplication jobApplication) {
        return jobApplicationRepository.save(jobApplication);
    }
}
