import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";

const BASE_URL = "http://localhost:8080/api/notifications";

const CreateNotification = () => {
  const [formData, setFormData] = useState({
    activityType: "",
    jobDescription: "",
    userEmail: "",
    timestamp: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_URL, formData);
      alert("Notification created successfully!");
    } catch (error) {
      console.error("Error creating notification:", error);
      alert("Failed to create notification.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Notification
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="Activity Type"
              name="activityType"
              value={formData.activityType}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="Job Description"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="User Email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Create Notification
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateNotification;