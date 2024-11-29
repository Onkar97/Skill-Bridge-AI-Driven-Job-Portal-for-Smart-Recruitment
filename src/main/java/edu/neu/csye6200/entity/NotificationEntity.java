package edu.neu.csye6200.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Integer notificationId;

    @Column(name = "activity_type", nullable = false)
    private String activityType;

    @Column(name = "job_description")
    private String jobDescription;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    public NotificationEntity() {
    }

    public NotificationEntity(String activityType, String jobDescription, String userEmail, LocalDateTime timestamp) {
        this.activityType = activityType;
        this.jobDescription = jobDescription;
        this.userEmail = userEmail;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Integer getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(Integer notificationId) {
        this.notificationId = notificationId;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
