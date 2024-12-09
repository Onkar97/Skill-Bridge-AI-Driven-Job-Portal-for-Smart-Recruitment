import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/dashboard.css";

const BASE_URL = "http://localhost:8080/api";

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  // Extract user email from localStorage
  const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    if (userEmail) {
      fetchUserId(userEmail);
    } else {
      setError("User not logged in.");
    }
  }, [userEmail]);

  // Fetch userId based on email
  const fetchUserId = async (email) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/find`, {
        params: { email },
      });

      if (response.status === 200 && response.data?.userId) {
        setUserId(response.data.userId);
        fetchUserApplications(response.data.userId);
      } else {
        setError("User not found.");
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError("Failed to retrieve user details. Please try again later.");
    }
  };

  // Fetch user applications
  const fetchUserApplications = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/job-application/user/${userId}`
      );

      if (response.status === 200 && Array.isArray(response.data)) {
        setApplications(response.data);
        setError(""); // Clear previous errors
      } else {
        setError("No job applications found.");
      }
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
        <p className="no-applications-message">No job applications found.</p>
      ) : (
        <ul className="application-list">
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <h2>{app.job?.title || "N/A"}</h2>
              <p>
                <strong>Company:</strong> {app.job?.company?.name || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {app.job?.location || "N/A"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    app.jobStatus?.toLowerCase() === "active"
                      ? "status-active"
                      : "status-pending"
                  }
                >
                  {app.jobStatus || "Pending"}
                </span>
              </p>
              <a
                href={`${BASE_URL}/job-application/resumes/user/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-resume-link"
              >
                View Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;