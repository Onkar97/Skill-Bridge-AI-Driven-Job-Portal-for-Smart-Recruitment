import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/companies/${companyId}`) // Replace with your backend API
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch company details.");
        return response.json();
      })
      .then((data) => setCompany(data))
      .catch((err) => setError(err.message));
  }, [companyId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{company.name}</h2>
      <p>Industry: {company.industry}</p>
    </div>
  );
};

export default CompanyDetails;