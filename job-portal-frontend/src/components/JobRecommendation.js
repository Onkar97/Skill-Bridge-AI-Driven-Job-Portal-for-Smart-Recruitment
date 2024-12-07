import React, { useState, useEffect } from "react";
import axios from "axios";

const JobRecommendation = ({ userId }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/job-recommendations/recommend`,
          { params: { userId } }
        );
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch job recommendations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Recommended Jobs</h2>
      {jobs.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>
                <strong>Company:</strong> {job.company.name}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobRecommendation;