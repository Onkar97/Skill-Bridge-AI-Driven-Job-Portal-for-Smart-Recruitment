import React, { useState } from "react";

const ResumeUpload = ({ userId }) => {
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resumeFile", resumeFile);

    fetch(`http://localhost:8080/api/users/${userId}/resume`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Resume uploaded successfully!");
        } else {
          alert("Failed to upload resume.");
        }
      })
      .catch((err) => console.error("Error uploading resume:", err));
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>Upload Resume</h2>
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ResumeUpload;