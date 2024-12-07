import React, { useContext } from "react";
import { UserContext } from "../components/UserContext";

const UserProfile = () => {
  const context = useContext(UserContext);

  // Ensure context is defined
  if (!context) {
    return <p>Error: User context not available!</p>;
  }

  const { user } = context;

  if (!user) {
    return <p>No user logged in.</p>;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default UserProfile;