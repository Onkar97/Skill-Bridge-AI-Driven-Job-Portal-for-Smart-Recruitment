package edu.neu.csye6200.dto;

public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Integer gender;       // Gender as an integer (e.g., 1 for Male, 2 for Female, etc.)
    private Integer birthYear;    // Year of birth
    private Integer role;         // Role as an integer (e.g., 1 for HR, 2 for Recruiter, 3 for Job Seeker)

    // No-argument constructor (required for frameworks like Spring)
    public RegisterRequest() {
    }

    // Parameterized constructor for convenience
    public RegisterRequest(String name, String email, String password, Integer gender, Integer birthYear, Integer role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.birthYear = birthYear;
        this.role = role;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }
}
