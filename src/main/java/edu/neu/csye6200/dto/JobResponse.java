package edu.neu.csye6200.dto;

import edu.neu.csye6200.entity.Company;
import java.time.LocalDateTime;

public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private LocalDateTime timestamp;
    private CompanyResponse company;

    // Constructor
    public JobResponse(Long id, String title, String description, String location, Double salary, LocalDateTime timestamp, Company company) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.salary = salary;
        this.timestamp = timestamp;
        this.company = company != null ? new CompanyResponse(company) : null;
    }

    // Inner DTO class for company
    public static class CompanyResponse {
        private Long id;
        private String name;
        private String industry;

        public CompanyResponse(Company company) {
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
