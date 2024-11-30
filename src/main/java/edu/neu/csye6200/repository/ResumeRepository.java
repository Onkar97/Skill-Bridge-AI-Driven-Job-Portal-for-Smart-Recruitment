package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.*;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ResumeRepository  extends JpaRepository<ResumeEntity, Integer>{

    @Query("SELECT r FROM ResumeEntity r WHERE r.user_id = :userId")
    int getResumeId(int userId);

    @Query("SELECT r FROM ResumeEntity r WHERE r.user_id = :userId")
    ResumeEntity getResumeById(int userId);

    @Modifying
    @Transactional
    @Query("UPDATE ResumeEntity r SET r.ability = :#{resumeEntity.ability}, r.internship = :#{resumeEntity.internship}, " +
            "r.work_experience = :#{resumeEntity.workExperience}, r.certificate = :#{resumeEntity.certificate}, " +
            "r.job_desire = :#{resumeEntity.jobDesire} WHERE r.user_id = :#{resumeEntity.resumeId}")
    int saveResume(ResumeEntity resumeEntity);
}
