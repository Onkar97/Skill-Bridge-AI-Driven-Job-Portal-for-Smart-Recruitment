import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        mobile: "",
        password: "",
        gender: "",
        birthYear: "",
        role: "user",
        nickname: "",
        province: "",
        city: "",
        eduDegree: "",
        graduation: "",
        graYear: "",
        major: "",
        dirDesire: "",
    });

    const [page, setPage] = useState(1); // Tracks the current page (1 or 2)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Correctly map gender and role
        const genderMapping = {
            MALE: 1,
            FEMALE: 2,
            OTHER: 3,
        };

        const dataToSend = {
            ...formData,
            gender: genderMapping[formData.gender] || null,
            dirDesire: formData.dirDesire ? parseInt(formData.dirDesire) : null,
            graYear: formData.graYear ? parseInt(formData.graYear) : null,
            birthYear: formData.birthYear ? parseInt(formData.birthYear) : null,
        };

        fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Registration successful!");
                    navigate("/login");
                } else {
                    alert("Registration failed. Please try again.");
                }
            })
            .catch((error) => console.error("Error during registration:", error));
    };


    const renderPageOne = () => (
        <div>
            <h2>Step 1: Basic Information</h2>
            <div className="form-group">
                <label>Email: <span className="required">*</span></label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                />
            </div>
            <div className="form-group">
                <label>Name: <span className="required">*</span></label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                />
            </div>
            <div className="form-group">
                <label>Mobile: <span className="required">*</span></label>
                <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                />
            </div>
            <div className="form-group">
                <label>Password: <span className="required">*</span></label>
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
                <label>Birth Year: <span className="required">*</span></label>
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
                <label>Role: <span className="required">*</span></label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                    <option value="user">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="hr">HR Manager</option>
                </select>
            </div>
            <button type="button" className="next-btn" onClick={() => setPage(2)}>
                Next
            </button>
        </div>
    );

    const renderPageTwo = () => (
        <div>
            <h2>Step 2: Additional Information</h2>
            <div className="form-group">
                <label>Nickname:</label>
                <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    placeholder="Enter your nickname"
                />
            </div>
            <div className="form-group">
                <label>Province:</label>
                <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="Enter your province"
                />
            </div>
            <div className="form-group">
                <label>City:</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                />
            </div>
            <div className="form-group">
                <label>Education Degree:</label>
                <input
                    type="text"
                    name="eduDegree"
                    value={formData.eduDegree}
                    onChange={handleChange}
                    placeholder="Enter your education degree"
                />
            </div>
            <div className="form-group">
                <label>Graduation:</label>
                <input
                    type="text"
                    name="graduation"
                    value={formData.graduation}
                    onChange={handleChange}
                    placeholder="Enter your graduation"
                />
            </div>
            <div className="form-group">
                <label>Graduation Year:</label>
                <input
                    type="number"
                    name="graYear"
                    value={formData.graYear}
                    onChange={handleChange}
                    placeholder="Enter your graduation year"
                />
            </div>
            <div className="form-group">
                <label>Major:</label>
                <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    placeholder="Enter your major"
                />
            </div>
            <div className="form-group">
                <label>Direction Desire:</label>
                <input
                    type="number"
                    name="dirDesire"
                    value={formData.dirDesire}
                    onChange={handleChange}
                    placeholder="Enter desired direction (1/2/3)"
                />
            </div>
            <button type="button" className="back-btn" onClick={() => setPage(1)}>
                Back
            </button>
            <button
                type="submit"
                className="submit-btn"
                disabled={
                    !formData.email ||
                    !formData.name ||
                    !formData.mobile ||
                    !formData.password ||
                    !formData.birthYear ||
                    !formData.role
                }
            >
                Register
            </button>
        </div>
    );

    return (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                {page === 1 ? renderPageOne() : renderPageTwo()}
            </form>
        </div>
    );
};

export default RegistrationPage;
