package edu.neu.csye6200.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Auto-generated ID, maps to the "id" column in the database

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user; // Assuming you have a User entity that matches the "user" table

    @ManyToOne
    @JoinColumn(name = "job_id", referencedColumnName = "id")
    private Job job;

    @Column(name = "date_applied", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "resume_path", nullable = false)
    private String resumePath; // Path to the stored resume file

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public Job getJob() {return job;}

    public void setJob(Job job) { this.job = job;}

    public LocalDateTime getDateApplied() {return timestamp; }

    public void setDateApplied(LocalDateTime timestamp) {this.timestamp = timestamp;}
}