import React, { useEffect, useState } from "react";

const ApplicationManagement = ({ jobId }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${jobId}/applications`)
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, [jobId]);

  const updateStatus = (applicationId, status) => {
    fetch(`http://localhost:8080/api/applications/${applicationId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Application status updated!");
          setApplications((prev) =>
            prev.map((app) =>
              app.id === applicationId ? { ...app, status } : app
            )
          );
        } else {
          alert("Failed to update status.");
        }
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div>
      <h2>Applications for Job ID: {jobId}</h2>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <p>User: {app.user.name}</p>
            <p>Status: {app.status}</p>
            <button onClick={() => updateStatus(app.id, "accepted")}>
              Accept
            </button>
            <button onClick={() => updateStatus(app.id, "rejected")}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationManagement;