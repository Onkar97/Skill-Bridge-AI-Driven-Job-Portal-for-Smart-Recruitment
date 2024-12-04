import React, { useEffect, useState } from "react";

const ResumeViewer = ({ userId }) => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/resumes/user/${userId}`) // Replace with your backend API
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch resume.");
        return response.json();
      })
      .then((data) => setResume(data))
      .catch((err) => setError(err.message));
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!resume) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Resume</h2>
      <p>Abilities: {resume.ability}</p>
      <p>Internship: {resume.internship}</p>
      <p>Work Experience: {resume.workExperience}</p>
      <p>Certifications: {resume.certificate}</p>
      <p>Job Desire: {resume.jobDesire}</p>
    </div>
  );
};

console.log("Hii viewer")

export default ResumeViewer;