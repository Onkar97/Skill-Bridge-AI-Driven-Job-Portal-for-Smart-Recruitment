package edu.neu.csye6200.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "\"user\"")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "mobile", nullable = false, length = 11)
    private String mobile;

    @Column(name = "password", nullable = false, length = 500)
    private String password;

    @Column(name = "name", length = 50)
    private String name;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "birth_year")
    private Integer birthYear;

    @Column(name = "nickname", length = 100)
    private String nickname;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "province", length = 50)
    private String province;

    @Column(name = "city", length = 50)
    private String city;

    @Column(name = "edu_degree", length = 50)
    private String eduDegree;

    @Column(name = "graduation", length = 100)
    private String graduation;

    @Column(name = "gra_year")
    private Integer graYear;

    @Column(name = "major", length = 50)
    private String major;

    @Column(name = "dir_desire")
    private Integer dirDesire;

    @Column(name = "role", length = 50)
    private String role;

    // Getters and setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
        return birthYear;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
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
        return eduDegree;
    }

    public void setEduDegree(String eduDegree) {
        this.eduDegree = eduDegree;
    }

    public String getGraduation() {
        return graduation;
    }

    public void setGraduation(String graduation) {
        this.graduation = graduation;
    }

    public Integer getGraYear() {
        return graYear;
    }

    public void setGraYear(Integer graYear) {
        this.graYear = graYear;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public Integer getDirDesire() {
        return dirDesire;
    }

    public void setDirDesire(Integer dirDesire) {
        this.dirDesire = dirDesire;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
