package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // Custom query method to find job applications by userId
    @Query("SELECT ja FROM JobApplication ja WHERE ja.user.id = :userId")
    List<JobApplication> findByUserId(@Param("userId") Long userId);

    // Corrected query to find job applications by job ID
    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.id = :jobId")
    List<JobApplication> findByJobId(@Param("jobId") Long jobId);

}
