import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Update with your backend URL

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "" ,
    location: "" ,
    salary: "",
    companyName: "",
    jobStatus: "active", // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Using the API endpoint to post job data
      const response = await axios.post(`${BASE_URL}/api/jobs`, formData, {
        headers: {
          "Content-Type": "application/json", // JSON for basic form data
        },
      });
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Salary:
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Company Name:
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Posted By:
        <input
          type="text"
          name="postedBy"
          value={formData.postedBy}
          onChange={handleChange}
        />
      </label>
      <label>
        Job Status:
        <select
          name="jobStatus"
          value={formData.jobStatus}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </label>
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostForm;