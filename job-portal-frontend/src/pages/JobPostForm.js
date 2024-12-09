import React, { useState } from "react";
import axios from "axios";
import "../styles/form.css";
import { useUserContext } from "../components/UserContext";

const BASE_URL = "http://localhost:8080";

const JobPostForm = () => {
  const { user } = useUserContext(); // Use UserContext to fetch user details

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyName: "",
    postedBy: user?.name || "", // Default to logged-in user's name
    jobStatus: "active",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.companyName ||
      !formData.postedBy
    ) {
      return "All fields except salary are required.";
    }
    if (formData.salary && isNaN(formData.salary)) {
      return "Salary must be a valid number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      // Post Job API
      await axios.post(`${BASE_URL}/api/jobs`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Send Notification API
      await axios.post(`${BASE_URL}/api/notifications`, {
        activityType: "JobPost",
        jobDescription: `A new job "${formData.title}" was posted by ${formData.postedBy}.`,
        userEmail: user?.email, // From UserContext
        timestamp: new Date().toISOString(),
      });

      alert("Job posted successfully!");

      // Reset Form
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        companyName: "",
        postedBy: user?.name || "",
        jobStatus: "active",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Post a New Job</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Job Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the job title"
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a brief job description"
          required
        ></textarea>

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter the job location"
          required
        />

        <label htmlFor="salary">Salary (Optional):</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter the salary"
        />

        <label htmlFor="companyName">Company Name:</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter the company name"
          required
        />

        <label htmlFor="postedBy">Posted By:</label>
        <input
          type="text"
          id="postedBy"
          name="postedBy"
          value={formData.postedBy}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="jobStatus">Job Status:</label>
        <select
          id="jobStatus"
          name="jobStatus"
          value={formData.jobStatus}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default JobPostForm;