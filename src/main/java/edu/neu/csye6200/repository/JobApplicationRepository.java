package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // Additional query methods can be added here if needed
}