import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/list.css";

const BASE_URL = "http://localhost:8080";

const JobList = ({ userId }) => {
  const [jobs, setJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false); // Tracks if the user is applying

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/jobs/all`);
        setJobs(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/jobs/search?keyword=${searchKeyword}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const handleApplyJob = () => {
    setIsApplying(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
    setIsApplying(false);
    setSelectedJob(null); // Close modal after submission
  };

  return (
    <div className="container">
      <h1 className="heading">Job Listings</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search jobs by role, company..."
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <ul className="job-list">
        {searchResults.map((job) => (
          <li
            key={job.id}
            className="job-item"
            onClick={() => handleViewJob(job)}
          >
            <div className="job-title">{job.title}</div>
            <div className="job-company">{job.companyName}</div>
          </li>
        ))}
      </ul>

      {selectedJob && (
        <div className="modal">
          <div className="modal-content">
            {!isApplying ? (
              <>
                <h2>{selectedJob.title}</h2>
                <p>
                  <strong>Company:</strong> {selectedJob.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {selectedJob.location}
                </p>
                <p>
                  <strong>Salary:</strong> ${selectedJob.salary}
                </p>
                <p>
                  <strong>Posted By:</strong> {selectedJob.postedBy}
                </p>
                <p>
                  <strong>Status:</strong> {selectedJob.jobStatus}
                </p>
                <p>
                  <strong>Description:</strong> {selectedJob.description}
                </p>
                <button
                  className="apply-btn"
                  onClick={handleApplyJob}
                >
                  Apply
                </button>
                <button
                  className="close-btn"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmitApplication}>
                <h2>Apply for {selectedJob.title}</h2>
                <p>
                  <strong>Company:</strong> {selectedJob.companyName}
                </p>
                <label htmlFor="resume">Upload Resume:</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  required
                  style={{ marginBottom: "15px" }}
                />
                <button
                  type="submit"
                  className="apply-submit-btn"
                >
                  Submit Application
                </button>
                <button
                  className="close-btn"
                  onClick={() => setIsApplying(false)}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;