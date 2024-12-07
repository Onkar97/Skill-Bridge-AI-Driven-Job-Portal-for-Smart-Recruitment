import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Base URL for the backend
const BASE_URL = "http://localhost:8080"; // Update with your backend URL

// Styled Paper for better UI
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
}));

const JobPostForm = ({ onJobPosted }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    companyName: "",
    postedBy: "",
    jobStatus: "active", // Default job status
    link: "", // New field for external link
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Notify the user of success
      alert("Job posted successfully!");

      // Call the callback to update job list if provided
      if (onJobPosted) {
        onJobPosted(formData); // Pass the newly posted job data back
      }

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        companyName: "",
        postedBy: "",
        jobStatus: "active",
        link: "", // Reset link field
      });
    } catch (error) {
      // Notify the user of an error
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper elevation={3}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          Post a Job
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
          Fill out the details below to post a new job opening.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Job Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Job Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
              required
              type="number"
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Posted By"
              name="postedBy"
              value={formData.postedBy}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="External Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="https://example.com"
            />
          </Box>
          <Box mb={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Job Status</InputLabel>
              <Select
                name="jobStatus"
                value={formData.jobStatus}
                onChange={handleChange}
                label="Job Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container justifyContent="center">
            <Button type="submit" variant="contained" color="primary" size="large">
              Post Job
            </Button>
          </Grid>
        </form>
      </StyledPaper>
    </Container>
  );
};

export default JobPostForm;