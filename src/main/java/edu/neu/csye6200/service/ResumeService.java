package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.ResumeEntity;
import edu.neu.csye6200.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeService  {

    @Autowired
    private ResumeRepository resumeRepository;


    public ResumeEntity getResumeByUserId(int userId) {

        return resumeRepository.getResumeById(userId);
    }



    public boolean updateResume(ResumeEntity resumeEntity) {


        return false;
    }

    public boolean createResume(ResumeEntity resumeEntity) {


        return false;
    }
}
