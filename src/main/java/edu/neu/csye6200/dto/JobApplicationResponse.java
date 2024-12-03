package edu.neu.csye6200.dto;

public class JobApplicationResponse {
    private String message;
    private String resumePath;
    private Long jobId;
    private String userEmail;

    // Constructors
    public JobApplicationResponse(String message, String resumePath, Long jobId, String userEmail) {
        this.message = message;
        this.resumePath = resumePath;
        this.jobId = jobId;
        this.userEmail = userEmail;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
