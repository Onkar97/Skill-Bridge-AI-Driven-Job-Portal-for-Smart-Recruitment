import React, { useState } from "react";

const CompanyForm = ({ onSubmit, existingData }) => {
  const [formData, setFormData] = useState(
    existingData || { name: "", industry: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Industry:
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default CompanyForm;