import React, { useState } from "react";

const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/jobs/search?query=${searchQuery}`) // Replace with your backend API
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  };

  return (
    <div>
      <h2>Search Jobs</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title, location, or company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Company: {job.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSearch;