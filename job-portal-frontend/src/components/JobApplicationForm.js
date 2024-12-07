import React, { useState, useEffect } from "react";
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

const BASE_URL = "http://localhost:8080"; // Update with your backend URL

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    jobId: "",
    resumeFile: null,
  });
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resumeFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("userId", formData.userId);
    form.append("jobId", formData.jobId);
    form.append("resumeFile", formData.resumeFile);

    try {
      const response = await axios.post(`${BASE_URL}/api/jobs/apply`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  useEffect(() => {
    // Fetch available jobs and users
    const fetchJobsAndUsers = async () => {
      try {
        const jobsResponse = await axios.get(`${BASE_URL}/api/jobs/all`);
        setJobs(jobsResponse.data);

        const usersResponse = await axios.get(`${BASE_URL}/api/users/all`);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching jobs or users:", error);
      }
    };
    fetchJobsAndUsers();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Apply for a Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel>User</InputLabel>
              <Select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel>Job</InputLabel>
              <Select
                name="jobId"
                value={formData.jobId}
                onChange={handleChange}
                required
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={3}>
            <TextField
              type="file"
              name="resumeFile"
              onChange={handleFileChange}
              fullWidth
              required
            />
          </Box>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit Application
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default JobApplicationForm;