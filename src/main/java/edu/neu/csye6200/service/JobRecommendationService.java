package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.Company;
import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.entity.JobApplication;
import edu.neu.csye6200.repository.CompanyRepository;
import edu.neu.csye6200.repository.JobApplicationRepository;
import edu.neu.csye6200.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobRecommendationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // Method to recommend jobs based on the user's previous applications
    public List<Job> recommendJobs(Long userId) {
        // Fetch all job applications for the user
        List<JobApplication> jobApplications = jobApplicationRepository.findByUserId(userId);

        // Extract company IDs from previously applied jobs
        List<Long> appliedCompanyIds = jobApplications.stream()
                .map(application -> application.getJob().getCompany().getId())
                .distinct()
                .collect(Collectors.toList());

        // Get the industries of the companies the user has applied to
        List<String> appliedIndustries = companyRepository.findAllById(appliedCompanyIds).stream()
                .map(Company::getIndustry)
                .distinct()
                .collect(Collectors.toList());

        // Find other jobs that belong to the same industries, but not the ones already applied for
        // Exclude previously applied jobs

        return jobRepository.findAllByCompanyIndustryIn(appliedIndustries).stream()
                .filter(job -> jobApplications.stream()
                        .noneMatch(application -> application.getJob().getId().equals(job.getId()))) // Exclude previously applied jobs
                .collect(Collectors.toList());
    }
}
