import React, { useEffect, useState } from "react";

const ApplicationManagement = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${jobId}/applications`) // Replace with your backend API
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch applications.");
        return response.json();
      })
      .then((data) => setApplications(data))
      .catch((err) => setError(err.message));
  }, [jobId]);

  const updateApplicationStatus = (applicationId, status) => {
    fetch(`http://localhost:8080/api/applications/${applicationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (response.ok) {
          setApplications((prev) =>
            prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
          );
          alert("Application status updated!");
        } else {
          alert("Failed to update application status.");
        }
      })
      .catch((err) => console.error("Error updating status:", err));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Applications for Job ID: {jobId}</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <p>Applicant: {app.user.name}</p>
            <p>Status: {app.status}</p>
            <button onClick={() => updateApplicationStatus(app.id, "Accepted")}>Accept</button>
            <button onClick={() => updateApplicationStatus(app.id, "Rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationManagement;