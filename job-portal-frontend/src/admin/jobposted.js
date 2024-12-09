import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/applications.css"; // Ensure CSS is linked

const BASE_URL = "http://localhost:8080"; // Backend API base URL

const JobApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/jobs/all`);

        if (response.status === 200 && Array.isArray(response.data)) {
          setApplications(response.data);
        } else {
          setErrorMessage("No job applications found.");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setErrorMessage("Failed to fetch job applications.");
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="applications-container">
      <h2 className="applications-heading">Job Applications</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {applications.length === 0 ? (
        <p className="no-applications-message">No job applications found.</p>
      ) : (
        <ul className="applications-list">
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <div>
                <strong>Job Title:</strong> {app.title || "N/A"}
              </div>
              <div>
                <strong>Description:</strong> {app.description || "N/A"}
              </div>
              <div>
                <strong>Location:</strong> {app.location || "N/A"}
              </div>
              <div>
                <strong>Salary:</strong>{" "}
                {app.salary ? `$${app.salary.toLocaleString()}` : "N/A"}
              </div>
              <div>
                <strong>Company Name:</strong> {app.company?.name || "N/A"}
              </div>
              <div>
                <strong>Posted By:</strong> {app.postedBy || "N/A"}
              </div>
              <div>
                <strong>Job Status:</strong> {app.jobStatus || "N/A"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplicationsList;