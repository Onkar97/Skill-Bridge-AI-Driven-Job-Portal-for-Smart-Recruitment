import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/companies`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Company List
        </Typography>
        {companies.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No companies available
          </Typography>
        ) : (
          <List>
            {companies.map((company, index) => (
              <React.Fragment key={company.id}>
                <ListItem>
                  <ListItemText
                    primary={company.name}
                    secondary={`Industry: ${company.industry}`}
                  />
                </ListItem>
                {index < companies.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default CompanyList;