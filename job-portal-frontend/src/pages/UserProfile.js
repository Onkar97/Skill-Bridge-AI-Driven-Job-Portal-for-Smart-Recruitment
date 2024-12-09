import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUserContext } from "../components/UserContext";

// Styled Components
const ProfileContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  padding: theme.spacing(4),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 700,
  width: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(4),
}));

const InfoRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
}));

const UserProfile = () => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <Typography variant="h6" color="error" align="center">
        No user logged in.
      </Typography>
    );
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              width: 120,
              height: 120,
              fontSize: "3rem",
              textTransform: "uppercase",
            }}
          >
            {user.name ? user.name[0] : "U"}
          </Avatar>

          <Typography
            variant="h4"
            sx={{ marginTop: 2, fontWeight: "bold" }}
            align="center"
          >
            {user.name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" align="center">
            {user.email}
          </Typography>
        </ProfileHeader>

        <Divider sx={{ marginBottom: 4 }} />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InfoRow>
                <Typography variant="h6" color="primary" gutterBottom>
                  Personal Details
                </Typography>
                <Typography>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography>
                  <strong>Role:</strong> {user.role}
                </Typography>
                <Typography>
                  <strong>Mobile:</strong> {user.mobile || "Not provided"}
                </Typography>
              </InfoRow>
            </Grid>

            <Grid item xs={12}>
              <InfoRow>
                <Typography variant="h6" color="primary" gutterBottom>
                  Additional Information
                </Typography>
                <Typography>
                  <strong>Province:</strong> {user.province || "Not provided"}
                </Typography>
                <Typography>
                  <strong>City:</strong> {user.city || "Not provided"}
                </Typography>
                <Typography>
                  <strong>Major:</strong> {user.major || "Not provided"}
                </Typography>
              </InfoRow>
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;