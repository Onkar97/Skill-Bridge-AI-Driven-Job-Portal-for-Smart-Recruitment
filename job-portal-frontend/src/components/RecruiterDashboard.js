import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useUserContext } from "../components/UserContext";

// API Base URL
const BASE_URL = "http://localhost:8080/api";

const RecruiterDashboard = () => {
  const { user } = useUserContext(); // Get user context
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.userId) {
      fetchApplications();
    }
  }, [user]);

  // Fetch job applications from the backend
  const fetchApplications = async () => {
    setLoading(true);
    setError(""); // Clear any existing error

    try {
      const response = await axios.get(`${BASE_URL}/job-application/all`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const enrichedApplications = await Promise.all(
          response.data.map(async (app) => {
            const jobDetails = await fetchJobDetails(app.jobId);
            return {
              ...app,
              jobTitle: jobDetails?.title || "N/A",
              jobLocation: jobDetails?.location || "N/A",
            };
          })
        );

        setApplications(enrichedApplications);
        if (enrichedApplications.length === 0) {
          setError("No job applications found.");
        }
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError(
        `Failed to load applications. Server responded with: ${error.response?.status || "unknown"}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch job details by job ID
  const fetchJobDetails = async (jobId) => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs/details`, {
        params: { jobId },
      });

      if (response.status === 200) {
        return response.data; // Return job details
      } else {
        console.warn(`Job with ID ${jobId} not found.`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      return null;
    }
  };

  // Handle resume download
  const handleDownloadResume = async (email) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/find`, {
        params: { email },
      });

      const userId = response.data?.userId;

      if (userId) {
        const resumeDownloadUrl = `${BASE_URL}/job-application/resumes/user?userId=${userId}`;
        window.open(resumeDownloadUrl, "_blank", "noopener noreferrer");
      } else {
        setError(`No resume found for email: ${email}`);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      setError("Error downloading resume.");
    }
  };

  return (
    <div className="container">
      <h1>Submitted Applications</h1>

      {loading && <p className="loading-message">Loading applications...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="application-list">
        {applications.map((app) => (
          <li key={app.jobId} className="application-item">
            <h2>Job Title: {app.jobTitle}</h2>
            <p>
              <strong>Location:</strong> {app.jobLocation}
            </p>
            <p>
              <strong>Applicant Email:</strong> {app.userEmail || "N/A"}
            </p>
            <button
              className="download-link"
              onClick={() => handleDownloadResume(app.userEmail)}
            >
              Download Resume
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;