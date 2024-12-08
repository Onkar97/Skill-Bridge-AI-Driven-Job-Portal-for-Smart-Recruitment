import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css"; // Assuming CSS for better styling

const BASE_URL = "http://localhost:8080/api";

const RecruiterDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetch job applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/job-application/all`);
      const validApplications = response.data.filter(
        (app) => app && app.job && app.user
      );

      if (validApplications.length === 0) {
        setError("No complete applications found.");
      } else {
        setApplications(validApplications);
        setError(""); // Clear previous errors
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Submitted Applications</h1>

      {loading && <p className="loading-message">Loading applications...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="application-list">
        {applications.map((app) => (
          <li key={app.id} className="application-item">
            <h2>{app.job.title || "N/A"}</h2>
            <p><strong>Applicant Name:</strong> {app.user.name || "N/A"}</p>
            <p><strong>Email:</strong> {app.user.email || "N/A"}</p>

            <a
              href={`${BASE_URL}/job-application/resumes/${app.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="download-link"
            >
              Download Resume
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecruiterDashboard;