import React, { createContext, useState, useContext, useEffect } from "react";

// Create UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// Initial State
const initialUserState = {
  userId: null,
  role: null,
  name: null,
  email: null,
};

// UserProvider to manage user session
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to update user state after login
  const updateUser = (userData) => {
    console.log("Updating User:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Function to clear user state on logout
  const clearUser = () => {
    setUser(initialUserState);
    localStorage.removeItem("user");
  };

  // Load user from localStorage on initial render
  useEffect(() => {
    console.log("Checking LocalStorage for User Data...");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("User Found in LocalStorage:", JSON.parse(storedUser));
      setUser(JSON.parse(storedUser));
    } else {
      console.log("No User Found in LocalStorage.");
    }
    setLoading(false); // Mark loading as complete
    console.log("Finished Checking LocalStorage.");
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
