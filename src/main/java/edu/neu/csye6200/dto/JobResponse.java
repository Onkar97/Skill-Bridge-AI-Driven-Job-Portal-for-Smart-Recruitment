package edu.neu.csye6200.dto;

import edu.neu.csye6200.entity.Job;
import java.time.LocalDateTime;

public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private LocalDateTime timestamp;
    private CompanyResponse company;

    // Constructor that accepts a Job entity
    public JobResponse(Job job) {
        this.id = job.getId();
        this.title = job.getTitle();
        this.description = job.getDescription();
        this.location = job.getLocation();
        this.salary = job.getSalary();
        this.timestamp = job.getTimestamp();
        this.company = job.getCompany() != null ? new CompanyResponse(job.getCompany()) : null;
    }

    // Inner DTO class for company
    public static class CompanyResponse {
        private Long id;
        private String name;
        private String industry;

        public CompanyResponse(edu.neu.csye6200.entity.Company company) {
            if (company != null) {
                this.id = company.getId();
                this.name = company.getName();
                this.industry = company.getIndustry();
            }
        }

        // Getters
        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getIndustry() {
            return industry;
        }
    }

    // Getters for JobResponse fields
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public Double getSalary() {
        return salary;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public CompanyResponse getCompany() {
        return company;
    }
}
