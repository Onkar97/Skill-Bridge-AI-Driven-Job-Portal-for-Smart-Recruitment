import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users") // Replace with your backend API
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch users.");
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  const deleteUser = (userId) => {
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers((prev) => prev.filter((user) => user.id !== userId));
          alert("User deleted successfully!");
        } else {
          alert("Failed to delete user.");
        }
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Admin Panel - User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;