import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

const CompanyForm = ({ fetchCompanies }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/companies`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Company saved successfully!");
      setFormData({ name: "", industry: "" }); // Reset the form
      fetchCompanies(); // Refresh the company list
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Failed to save company. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add / Update Company
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Save Company
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CompanyForm;