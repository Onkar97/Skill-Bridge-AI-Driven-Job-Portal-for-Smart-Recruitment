import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const BASE_URL = "http://localhost:8080/api";

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage

  useEffect(() => {
    fetchUserApplications();
  }, []);

  // Fetch user applications
  const fetchUserApplications = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/job-application/user/${userId}`
      );
      setApplications(response.data || []);
      setError(""); // Clear previous errors
    } catch (error) {
      console.error("Error fetching user applications:", error);
      setError("Failed to load job applications. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1>Your Applied Jobs</h1>

      {error && <p className="error-message">{error}</p>}

      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <ul className="application-list">
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <h2>{app.job.title || "N/A"}</h2>
              <p><strong>Company:</strong> {app.job.companyName || "N/A"}</p>
              <p><strong>Location:</strong> {app.job.location || "N/A"}</p>
              <p><strong>Application Status:</strong> {app.jobStatus || "Pending"}</p>
              <a
                href={`${BASE_URL}/job-application/resumes/user/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;