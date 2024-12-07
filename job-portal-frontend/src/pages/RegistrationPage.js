import React, { useState } from "react";
import "../styles/RegistrationPage.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        mobile: "",
        password: "",
        gender: "",
        birthYear: "",
        role: "JOB_SEEKER",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const genderMapping = {
            MALE: 1,
            FEMALE: 2,
            OTHER: 3,
        };

        const roleMapping = {
            JOB_SEEKER: 1,
            RECRUITER: 2,
            HR_MANAGER: 3,
        };

        const dataToSend = {
            ...formData,
            gender: genderMapping[formData.gender] || null,
            role: roleMapping[formData.role] || null,
        };

        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Registration successful!");
                } else {
                    alert("Registration failed. Please try again.");
                }
            })
            .catch((error) => console.error("Error during registration:", error));
    };

    return (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-group">
                    <label>Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="Enter your mobile number"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Birth Year:</label>
                    <input
                        type="number"
                        name="birthYear"
                        value={formData.birthYear}
                        onChange={handleChange}
                        required
                        placeholder="Enter your birth year"
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="JOB_SEEKER">Job Seeker</option>
                        <option value="RECRUITER">Recruiter</option>
                        <option value="HR_MANAGER">HR Manager</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
};

export default RegistrationPage;