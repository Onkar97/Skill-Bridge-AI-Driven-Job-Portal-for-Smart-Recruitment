import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  OutlinedInput,
  Button,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  FormControl,
} from "@mui/material";

const BASE_URL = "http://localhost:8080"; // Replace with your backend URL

const CompanyForm = ({ fetchCompanies }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/companies`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setAlert({
        open: true,
        message: "Company saved successfully!",
        severity: "success",
      });

      setFormData({ name: "", industry: "" }); // Reset form after success

      // Call fetchCompanies if provided
      if (typeof fetchCompanies === "function") {
        fetchCompanies();
      }
    } catch (error) {
      console.error("Error saving company:", error);
      setAlert({
        open: true,
        message: "Failed to save company. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ padding: 4, mt: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Add Company
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ marginBottom: 1, fontWeight: "bold" }}
              >
                Enter Company Name:
              </Typography>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                  }}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                sx={{ marginBottom: 1, fontWeight: "bold" }}
              >
                Enter Industry Type:
              </Typography>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Enter industry type"
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                  }}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  padding: 2,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Save Company
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Alert Notification */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

// Default Prop for Safety
CompanyForm.defaultProps = {
  fetchCompanies: () => console.warn("fetchCompanies not provided"),
};

export default CompanyForm;