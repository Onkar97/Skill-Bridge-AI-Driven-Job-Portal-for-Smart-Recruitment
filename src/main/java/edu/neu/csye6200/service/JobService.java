package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

}

