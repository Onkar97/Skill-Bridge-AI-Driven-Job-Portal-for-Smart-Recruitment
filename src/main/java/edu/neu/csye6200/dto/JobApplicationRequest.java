package edu.neu.csye6200.dto;

import java.time.LocalDateTime;

public class JobApplicationRequest {

    private Integer userId;
    private Long jobId;
    private String resumeFile;
    private LocalDateTime dateApplied;

    // Getter and Setter methods
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getResumeFile() {
        return resumeFile;
    }

    public void setResumeFile(String resumeFile) {
        this.resumeFile = resumeFile;
    }

    public LocalDateTime getDateApplied() {
        return dateApplied;
    }

    public void setDateApplied(LocalDateTime dateApplied) {
        this.dateApplied = dateApplied;
    }
}
