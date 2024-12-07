import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

const JobApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/job-application`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setErrorMessage("Failed to fetch job applications.");
      }
    };
    fetchApplications();
  }, []);

  const handleViewResume = (resumePath) => {
    window.open(`${BASE_URL}/api/resumes/${resumePath}`, "_blank");
  };

  return (
    <div className="applications-container">
      <h2 className="applications-heading">Job Applications</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <ul className="applications-list">
          {applications.map((app, index) => (
            <li key={index} className="application-item">
              <div>
                <strong>Job ID:</strong> {app.jobId}
              </div>
              <div>
                <strong>User Email:</strong> {app.userEmail}
              </div>
              <div>
                <strong>Resume:</strong>{" "}
                <button
                  className="view-resume-btn"
                  onClick={() => handleViewResume(app.resumePath)}
                >
                  View Resume
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplicationsList;