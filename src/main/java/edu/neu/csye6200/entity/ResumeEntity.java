package edu.neu.csye6200.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "resume", schema = "public")
public class ResumeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resume_id;
    private String ability;
    private String internship;
    private String work_experience;
    private String certificate;
    private String job_desire;
    private int user_id;

    public int getResumeId() {
        return resume_id;
    }

    public void setResumeId(int resume_id) {
        this.resume_id = resume_id;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }

    public String getInternship() {
        return internship;
    }

    public void setInternship(String internship) {
        this.internship = internship;
    }

    public String getWorkExperience() {
        return work_experience;
    }

    public void setWorkExperience(String work_experience) {
        this.work_experience = work_experience;
    }

    public String getCertificate() {
        return certificate;
    }

    public void setCertificate(String certificate) {
        this.certificate = certificate;
    }

    public String getJobDesire() {
        return job_desire;
    }

    public void setJobDesire(String job_desire) {
        this.job_desire = job_desire;
    }

    public int getUserId() {
        return user_id;
    }

    public void setUserId(int user_id) {
        this.user_id = user_id;
    }
}
