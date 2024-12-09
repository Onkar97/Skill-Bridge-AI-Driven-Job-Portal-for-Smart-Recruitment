import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/list.css"; // Updated style import
import { useUserContext } from "../components/UserContext";

const BASE_URL = "http://localhost:8080/api";

const UserJobApplication = () => {
  const { user } = useUserContext(); // Use UserContext for user data
  const [jobs, setJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs/all`);
      setJobs(response.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Search jobs by keyword
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/jobs/search?keyword=${searchKeyword}`
      );
      setJobs(response.data || []);
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  // Apply for the selected job
  const handleApply = async (jobId) => {
    const formData = new FormData();
    const userId = user?.userId; // Fetch from UserContext
    const resumeInput = document.getElementById(`resume-${jobId}`);
    const resumeFile = resumeInput?.files[0];

    if (!userId || !resumeFile) {
      alert("User ID or resume file is missing!");
      return;
    }

    formData.append("userId", userId);
    formData.append("jobId", jobId);
    formData.append("resumeFile", resumeFile);

    try {
      await axios.post(`${BASE_URL}/job-application`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully!");

      // Clear file input after successful application
      resumeInput.value = "";
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(
        `Application failed: ${error.response?.data?.error || "Unknown error"}`
      );
    }
  };

  return (
    <div className="container">
      <h1>Find Jobs and Apply</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by job title or company"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className="job-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <h2>{job.title}</h2>
            <p>
              <strong>Company Name:</strong> {job.company.name || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {job.location}
            </p>
            <p>
              <strong>Salary:</strong> ${job.salary}
            </p>
            <p>
              <strong>Posted By:</strong> {job.postedBy}
            </p>

            <div className="apply-section">
              <label htmlFor={`resume-${job.id}`} className="custom-file-upload">
                Choose Resume
                <input type="file" id={`resume-${job.id}`} required />
              </label>
              <button className="apply-btn" onClick={() => handleApply(job.id)}>
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserJobApplication;