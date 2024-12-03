package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.JobRequest;
import edu.neu.csye6200.dto.JobResponse;
import edu.neu.csye6200.entity.Company;
import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.repository.CompanyRepository;
import edu.neu.csye6200.repository.JobRepository;
import edu.neu.csye6200.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody JobRequest jobRequest) {
        // Find the company by name
        Company company = companyRepository.findByName(jobRequest.getCompanyName());
        if (company == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Company not found");
        }

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
        Job savedJob = jobRepository.save(job);

        // Convert to JobResponse and return
        JobResponse response = new JobResponse(savedJob);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllJobs() {
        // Fetch all jobs
        List<Job> jobs = jobRepository.findAll();

        // Convert to a list of JobResponse DTOs
        List<JobResponse> jobResponses = jobs.stream()
                .map(JobResponse::new)
                .toList();

        return ResponseEntity.ok(jobResponses);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchJobs(@RequestParam("keyword") String keyword) {
        List<Job> jobs = jobService.searchJobs(keyword);

        if (jobs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<JobResponse> responses = jobs.stream()
                .map(JobResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

}
