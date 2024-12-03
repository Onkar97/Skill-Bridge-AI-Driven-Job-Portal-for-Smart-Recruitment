import React, { useEffect, useState } from "react";

const JobList = ({ apiUrl }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [apiUrl]);

  return (
    <div>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: ${job.salary}</p>
            <p>Company: {job.companyName}</p>
            <p>Status: {job.jobStatus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;