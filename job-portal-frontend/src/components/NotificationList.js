import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Box,
  Paper,
} from "@mui/material";

const BASE_URL = "http://localhost:8080/api/notifications";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [filterEmail, setFilterEmail] = useState("");

  const fetchNotifications = async (email = "") => {
    try {
      const url = email ? `${BASE_URL}/user/${email}` : BASE_URL;
      const response = await axios.get(url);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleFilterChange = (e) => {
    const email = e.target.value;
    setFilterEmail(email);
    fetchNotifications(email);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Notifications
        </Typography>
        <Box mb={3}>
          <TextField
            label="Filter by User Email"
            value={filterEmail}
            onChange={handleFilterChange}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Activity Type</TableCell>
              <TableCell>Job Description</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.notificationId}>
                <TableCell>{notification.notificationId}</TableCell>
                <TableCell>{notification.activityType}</TableCell>
                <TableCell>{notification.jobDescription}</TableCell>
                <TableCell>{notification.userEmail}</TableCell>
                <TableCell>{new Date(notification.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default NotificationList;