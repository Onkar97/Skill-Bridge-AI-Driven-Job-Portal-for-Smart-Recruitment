import React, { useEffect, useState } from "react";

const CompanyList = ({ apiUrl }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, [apiUrl]);

  return (
    <div>
      <h1>Companies</h1>
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