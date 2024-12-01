package edu.neu.csye6200.dto;

public class JobApplicationResponse {

    private String message;
    private String resumePath;
    private Long jobId;

    public JobApplicationResponse(String message, String resumePath, Long jobId) {
        this.message = message;
        this.resumePath = resumePath;
        this.jobId = jobId;
    }

    // Getter and Setter methods
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
}
