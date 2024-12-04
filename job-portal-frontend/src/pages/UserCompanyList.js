import React, { useEffect, useState } from "react";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/companies")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <p>Name: {company.name}</p>
            <p>Industry: {company.industry}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;