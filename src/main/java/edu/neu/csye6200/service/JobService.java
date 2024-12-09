package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.JobRequest;
import edu.neu.csye6200.dto.JobResponse;
import edu.neu.csye6200.entity.Company;
import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.repository.CompanyRepository;
import edu.neu.csye6200.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }

    public List<Job> searchJobs(String keyword) {
        return jobRepository.searchJobsByKeyword(keyword);
    }

    public Job createJob(JobRequest jobRequest, Company company) {

        // Create the job
        Job job = new Job();
        job.setTitle(jobRequest.getTitle());
        job.setDescription(jobRequest.getDescription());
        job.setLocation(jobRequest.getLocation());
        job.setSalary(jobRequest.getSalary());
        job.setCompany(company);
        job.setTimestamp(LocalDateTime.now());
        job.setPostedBy(jobRequest.getPostedBy());
        job.setJobStatus(jobRequest.getJobStatus());

        // Save the job

        return jobRepository.save(job);
    }

    public List<JobResponse> getAllJobsApplications() {

        // Fetch all jobs
        List<Job> jobs = jobRepository.findAll();

        // Convert to a list of JobResponse DTOs

        return jobs.stream()
                .map(JobResponse::new)
                .toList();
    }

    // Service method to fetch job details by job ID
    public Optional<Job> getJobById(Long jobId) {
        return jobRepository.findByJobId(jobId);
    }
}

