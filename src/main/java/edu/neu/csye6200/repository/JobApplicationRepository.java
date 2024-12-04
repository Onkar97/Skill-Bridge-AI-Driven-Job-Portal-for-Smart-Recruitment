package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

}