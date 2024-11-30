package edu.neu.csye6200.dto;

import java.time.LocalDateTime;

public class JobApplicationResponse {
    private Long id;
    private String applicantName;
    private String applicantEmail;
    private String resumeFilePath;
    private LocalDateTime applicationDate;
    private JobResponse job;

    // Constructor
    public JobApplicationResponse(Long id, String applicantName, String applicantEmail,
                                  String resumeFilePath, LocalDateTime applicationDate, JobResponse job) {
        this.id = id;
        this.applicantName = applicantName;
        this.applicantEmail = applicantEmail;
        this.resumeFilePath = resumeFilePath;
        this.applicationDate = applicationDate;
        this.job = job;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getApplicantName() {
        return applicantName;
    }

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public String getResumeFilePath() {
        return resumeFilePath;
    }

    public LocalDateTime getApplicationDate() {
        return applicationDate;
    }

    public JobResponse getJob() {
        return job;
    }
}
