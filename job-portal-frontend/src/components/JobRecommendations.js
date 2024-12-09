import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/recommendations.css";
import { useUserContext } from "../components/UserContext";

const BASE_URL = "http://localhost:8080/api";

const JobRecommendations = () => {
  const { user } = useUserContext(); // Fetch user context
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  // Fetch Recommendations
  useEffect(() => {
    if (user?.userId) {
      fetchRecommendations(user.userId);
    }
  }, [user]);

  const fetchRecommendations = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/job-recommendations/recommend?userId=${userId}`
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setRecommendedJobs(response.data);
      } else {
        setRecommendedJobs([]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Handle Job Application
  const handleApply = async (jobId) => {
    const formData = new FormData();
    const resumeInput = document.getElementById(`resume-${jobId}`);
    const resumeFile = resumeInput?.files[0];

    if (!user?.userId || !resumeFile) {
      alert("User ID or resume file is missing!");
      return;
    }

    formData.append("userId", user.userId);
    formData.append("jobId", jobId);
    formData.append("resumeFile", resumeFile);

    try {
      await axios.post(`${BASE_URL}/job-application`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application submitted successfully!");
      resumeInput.value = ""; // Clear file input on success
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(
        `Application failed: ${
          error.response?.data?.message || "Unknown server error"
        }`
      );
    }
  };

  return (
    <div className="recommendation-container">
      <h2>Recommended Jobs</h2>

      {recommendedJobs.length === 0 ? (
        <p className="no-recommendations">No job recommendations available.</p>
      ) : (
        <div className="job-cards">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.company.name}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Salary:</strong> ${job.salary || "Not Provided"}
              </p>
              <p>
                <strong>Posted By:</strong> {job.postedBy}
              </p>
              <p>
                <strong>Status:</strong> {job.jobStatus}
              </p>
              <p>
                <strong>Description:</strong> {job.description}
              </p>

              {/* Apply Section */}
              <div className="apply-section">
                <label htmlFor={`resume-${job.id}`} className="custom-file-upload">
                  Choose File
                  <input type="file" id={`resume-${job.id}`} required />
                </label>
                <button className="apply-btn" onClick={() => handleApply(job.id)}>
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobRecommendations;