import React from "react";
import JobPostForm from "./JobPostForm";
import JobList from "./JobList";

const JobManagement = () => {
  const apiUrl = "http://localhost:8080/api/jobs"; // Replace with your API endpoint

  const postJob = async (jobData) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      if (response.ok) {
        alert("Job posted successfully!");
      } else {
        alert("Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div>
      <h1>Job Management</h1>
      <JobPostForm onSubmit={postJob} />
      <JobList apiUrl={apiUrl} />
    </div>
  );
};

export default JobManagement;