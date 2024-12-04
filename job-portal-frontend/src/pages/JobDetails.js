import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/jobs/${jobId}`) // Replace with your backend API
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch job details.");
        return response.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setError(err.message));
  }, [jobId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <p>Description: {job.description}</p>
      <p>Location: {job.location}</p>
      <p>Salary: ${job.salary}</p>
      <p>Company: {job.company.name}</p>
      <p>Status: {job.jobStatus}</p>
    </div>
  );
};

export default JobDetails;