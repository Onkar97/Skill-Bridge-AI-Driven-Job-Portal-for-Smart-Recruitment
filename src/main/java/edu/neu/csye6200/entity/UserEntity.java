package edu.neu.csye6200.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


@Entity
@Table(name = "user", schema = "public")
public class UserEntity {
    @Id
    private Integer user_id;
    private String mobile;
    private String password;
    private String name;
    private Integer gender;
    private Integer birth_year;
    private String nickname;
    private String email;
    private String province;
    private String city;
    private String edu_degree;
    private String graduation;
    private Integer gra_year;
    private String major;
    private Integer dir_desire;
    private String role;

    // No-argument constructor (required by Hibernate)
    public UserEntity() {
        // Hibernate will use this constructor
    }

    // Constructor
    public UserEntity(Integer id, String email, String name, String role) {
        this.user_id = id;
        this.email = email;
        this.name = name;
        this.role = role;
    }

    // Getters and Setters
    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Integer getBirthYear() {
        return birth_year;
    }

    public void setBirthYear(Integer birth_year) {
        this.birth_year = birth_year;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEduDegree() {
        return edu_degree;
    }

    public void setEduDegree(String edu_degree) {
        this.edu_degree = edu_degree;
    }

    public String getGraduation() {
        return graduation;
    }

    public void setGraduation(String graduation) {
        this.graduation = graduation;
    }

    public Integer getGraYear() {
        return gra_year;
    }

    public void setGraYear(Integer gra_year) {
        this.gra_year = gra_year;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Integer getDirDesire() {
        return dir_desire;
    }

    public void setDirDesire(Integer dir_desire) {
        this.dir_desire = dir_desire;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
