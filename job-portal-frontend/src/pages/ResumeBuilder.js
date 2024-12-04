import React, { useState } from "react";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    ability: "",
    internship: "",
    workExperience: "",
    certificate: "",
    jobDesire: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Resume submitted successfully!");
        } else {
          alert("Failed to submit resume.");
        }
      })
      .catch((error) => console.error("Error submitting resume:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Resume</h2>
      <label>
        Abilities:
        <textarea
          name="ability"
          value={formData.ability}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <label>
        Internship:
        <textarea
          name="internship"
          value={formData.internship}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Work Experience:
        <textarea
          name="workExperience"
          value={formData.workExperience}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Certifications:
        <textarea
          name="certificate"
          value={formData.certificate}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Job Preferences:
        <textarea
          name="jobDesire"
          value={formData.jobDesire}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <button type="submit">Submit Resume</button>
    </form>
  );
};

export default ResumeBuilder;