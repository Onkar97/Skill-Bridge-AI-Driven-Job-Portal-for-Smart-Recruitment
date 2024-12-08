import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Backend base URL

const UserApplications = ({ userId }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/job-applications/user/${userId}`
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [userId]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Applications
        </Typography>
        <List>
          {applications.map((app) => (
            <React.Fragment key={app.id}>
              <ListItem>
                <ListItemText
                  primary={app.jobTitle}
                  secondary={`Applied on: ${new Date(
                    app.dateApplied
                  ).toLocaleDateString()}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default UserApplications;