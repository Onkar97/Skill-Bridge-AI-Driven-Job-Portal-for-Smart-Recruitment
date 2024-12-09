package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.Job;
import edu.neu.csye6200.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("SELECT j FROM Job j WHERE j.id = :jobId")
    Optional<Job> findByJobId(@Param("jobId") Long jobId);

    @Query("SELECT j FROM Job j WHERE " +
            "LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(j.company.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Job> searchJobsByKeyword(@Param("keyword") String keyword);


    // Assuming 'industry' is a property of 'Company', not 'Job'
    List<Job> findAllByCompanyIndustryIn(List<String> industries);
}

