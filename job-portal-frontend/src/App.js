import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUserContext } from "./components/UserContext";

// Import All Pages and Components
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./components/UserDashboard";
import JobList from "./pages/JobList";
import JobPostForm from "./pages/JobPostForm";
import JobApplicationForm from "./components/JobApplicationForm";
import NotificationList from "./components/NotificationList";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Header from "./components/Header";

import CompanyForm from "./pages/CompanyForm";
import JobManagement from "./pages/JobManagement";
import RegistrationPage from "./pages/RegistrationPage";
import ResumeViewer from "./pages/ResumeViewer";
import CompanyDetails from "./pages/CompanyDetails";
import JobDetails from "./pages/JobDetails";
import JobSearch from "./admin/JobSearch";
import ApplicationConfirmation from "./admin/ApplicationConfirmation";
import ResumeUpload from "./admin/ResumeUpload";
import ApplicationManagement from "./admin/ApplicationManagement";
import JobApplicationsList from "./admin/JobApplicationsList";
import CreateNotification from "./admin/CreateNotification";
import UserApplications from "./pages/UserApplications";
import CompanyList from "./pages/CompanyList";
import JobManager from "./components/JobManager";
import UserProfile from "./pages/UserProfile";
import JobRecommendations from "./components/JobRecommendations";
import RecruiterDashboard from "./components/RecruiterDashboard";

console.log("App.js: Application initialized.");

// Role-based Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useUserContext();

  console.log("Checking user context in ProtectedRoute:", user);

  if (!user?.role) {
    console.warn("User not logged in, redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn(`Unauthorized access for role ${user.role}, redirecting to home...`);
    return <Navigate to="/" replace />;
  }

  console.log(`Access granted for role ${user.role}`);
  return children;
};

function AppRoutes() {
  const { user, loading } = useUserContext();

  console.log("App.js: Checking Context - Loading:", loading, "User:", user);

  // Wait for context to initialize before rendering
  if (loading) {
    return <div>Loading Application...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/RegistrationPage" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Shared Routes for Logged-In Users */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <NotificationList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["user", "recruiter", "hr"]}>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/JobApplicationForm"
        element={<ProtectedRoute><JobApplicationForm /></ProtectedRoute>}
      />
      <Route
        path="/CompanyForm"
        element={<ProtectedRoute><CompanyForm /></ProtectedRoute>}
      />
      <Route
        path="/JobManagement"
        element={<ProtectedRoute><JobManagement /></ProtectedRoute>}
      />
      <Route
        path="/DashboardPage"
        element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>}
      />
      <Route
        path="/JobDetails"
        element={<ProtectedRoute><JobDetails /></ProtectedRoute>}
      />
      <Route
        path="/ResumeViewer"
        element={<ProtectedRoute><ResumeViewer /></ProtectedRoute>}
      />
      <Route
        path="/CompanyDetails"
        element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>}
      />
      <Route
        path="/JobManager"
        element={<ProtectedRoute><JobManager /></ProtectedRoute>}
      />

      {/* User-Specific Routes */}
      <Route
        path="/JobList"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <JobList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/CompanyList"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <CompanyList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/JobRecommendations"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <JobRecommendations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-applications"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ApplicationConfirmation"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ApplicationConfirmation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/JobSearch"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <JobSearch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ResumeUpload"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />
<Route
        path="/recruiter-dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      {/* Recruiter- and HR-Specific Routes */}
      <Route
        path="/JobApplicationsList"
        element={
          <ProtectedRoute allowedRoles={["recruiter", "hr"]}>
            <JobApplicationsList />
          </ProtectedRoute>
        }
      />

      {/* HR-Specific Routes */}
      <Route
        path="/JobPostForm"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <JobPostForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <CreateNotification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ApplicationManagement"
        element={
          <ProtectedRoute allowedRoles={["hr"]}>
            <ApplicationManagement />
          </ProtectedRoute>
        }
      />
       <Route
              path="/CompanyForm"
              element={
                <ProtectedRoute allowedRoles={["hr"]}>
                  <ApplicationManagement />
                </ProtectedRoute>
              }
            />

      {/* Fallback Route */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;