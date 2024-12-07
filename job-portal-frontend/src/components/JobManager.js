import React, { useState, useEffect } from "react";
import axios from "axios";
import JobList from "../pages/JobList";
import JobPostForm from "../pages/JobPostForm";

const BASE_URL = "http://localhost:8080";

const JobManager = ({ userId }) => {
  const [jobs, setJobs] = useState([]); // Shared state for job list

  useEffect(() => {
    // Fetch jobs on component mount
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/jobs`);
        setJobs(response.data || []); // Ensure the response is an array
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const addJobToList = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]); // Add the new job to the top of the list
  };

  return (
    <div>
      <JobPostForm onJobPosted={addJobToList} />
      <JobList jobs={jobs} userId={userId} />
    </div>
  );
};

export default JobManager;