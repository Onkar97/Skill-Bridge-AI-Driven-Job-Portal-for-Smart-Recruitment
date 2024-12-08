import React from "react";
import {
  Container, Card, CardContent, Typography, Avatar, Box, Grid, Paper
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
  maxWidth: 600,
  width: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(3),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const InfoRow = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

const UserProfile = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Typography variant="h6" color="error">No user logged in.</Typography>;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <Avatar
            sx={{
              bgcolor: "#457b9d",
              width: 100,
              height: 100,
              fontSize: "2.5rem",
            }}
          >
            {user.name ? user.name[0] : "U"}
          </Avatar>
        </ProfileHeader>

        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {user.name}
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            {user.email}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InfoRow>
                <Typography variant="h6">User Details</Typography>
                <Typography><strong>Email:</strong> {user.email}</Typography>
                <Typography><strong>Role:</strong> {user.role}</Typography>
                <Typography><strong>Mobile:</strong> {user.mobile || "Not provided"}</Typography>
              </InfoRow>
            </Grid>

            <Grid item xs={12}>
              <InfoRow>
                <Typography variant="h6">Other Information</Typography>
                <Typography><strong>Province:</strong> {user.province || "Not provided"}</Typography>
                <Typography><strong>City:</strong> {user.city || "Not provided"}</Typography>
                <Typography><strong>Major:</strong> {user.major || "Not provided"}</Typography>
              </InfoRow>
            </Grid>
          </Grid>
        </CardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;
