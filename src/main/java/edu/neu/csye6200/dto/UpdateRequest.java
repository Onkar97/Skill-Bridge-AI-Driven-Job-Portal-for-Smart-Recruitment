package edu.neu.csye6200.dto;

public class UpdateRequest {
    private String mobile;
    private String name;
    private String password;
    private Integer gender;
    private Integer birthYear;
    private String state;
    private String city;
    private String graduation;
    private String major;

    // Constructor to initialize the UpdateRequest object
    public UpdateRequest(String mobile, String name, String password, Integer gender,
                         Integer birthYear, String state, String city, String graduation, String major) {
        this.mobile = mobile;
        this.name = name;
        this.password = password;
        this.gender = gender;
        this.birthYear = birthYear;
        this.state = state;
        this.city = city;
        this.graduation = graduation;
        this.major = major;
    }

    // Getters and Setters for each field

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getGraduation() {
        return graduation;
    }

    public void setGraduation(String graduation) {
        this.graduation = graduation;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }
}
