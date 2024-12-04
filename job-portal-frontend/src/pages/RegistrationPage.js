import React, { useState } from "react";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        mobile: "",
        password: "",
        gender: "", // This will still be a string initially
        birthYear: "",
        role: "JOB_SEEKER", // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Map gender strings to integers
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

        // Update formData to change gender to an integer
        const dataToSend = {
            ...formData,
            gender: genderMapping[formData.gender] || null, // Set to null if gender is not selected
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
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Mobile:
                <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>
            </label>
            <label>
                Birth Year:
                <input
                    type="number"
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="RECRUITER">Recruiter</option>
                    <option value="HR_MANAGER">HR Manager</option>
                </select>
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationPage;