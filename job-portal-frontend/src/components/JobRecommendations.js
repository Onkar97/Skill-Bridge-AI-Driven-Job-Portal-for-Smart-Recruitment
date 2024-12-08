import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "../styles/recommendations.css";

const BASE_URL = "http://localhost:8080";

const JobRecommendations = ({ userId }) => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Recommendations
  useEffect(() => {
    if (userId) {
      axios
        .get(`${BASE_URL}/api/job-recommendations/recommend?userId=${userId}`)
        .then((response) => setRecommendedJobs(response.data))
        .catch((error) => console.error("Error fetching recommendations:", error));
    }
  }, [userId]);

  // View Job Details
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="recommendation-container">
      <h2>Recommended Jobs</h2>

      {recommendedJobs.length === 0 ? (
        <p>No job recommendations available.</p>
      ) : (
        <ul className="job-list">
          {recommendedJobs.map((job) => (
            <li key={job.id} className="job-item">
              <div className="job-title" onClick={() => handleViewJob(job)}>
                {job.title} - <span className="company-name">{job.companyName}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Job Details */}
      {selectedJob && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
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

          <button className="apply-btn">Apply</button>
          <button className="close-btn" onClick={closeModal}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default JobRecommendations;