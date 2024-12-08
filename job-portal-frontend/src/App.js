import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./components/UserDashboard";
import JobList from "./pages/JobList";
import JobPostForm from "./pages/JobPostForm";
import JobApplicationForm from "./components/JobApplicationForm";
import NotificationList from "./components/NotificationList";
import DashboardPage from "./pages/DashboardPage";
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
import ApplicationConfirmation from "./admin/ApplicationConfirmation"
import ResumeUpload from "./admin/ResumeUpload";
import ApplicationManagement from "./admin/ApplicationManagement";
import AdminPanel from "./admin/AdminPanel";
import JobApplicationsList from "./admin/JobApplicationsList";
import CreateNotification from "./admin/CreateNotification";
import UserApplications from "./pages/UserApplications";
import CompanyList from "./pages/CompanyList";
import JobManager from "./components/JobManager";
import UserProfile from "./pages/UserProfile";
import JobRecommendations from "./components/JobRecommendations";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/CompanyList" element={<CompanyList />} />
        <Route path="/CompanyDetails" element={<CompanyDetails />} />
        <Route path = "/JobDetails" element={<JobDetails />} />
        <Route path = "/JobManager" element={<JobManager/>} />
         <Route path="/profile" element={<UserProfile />} />
        <Route path="/my-applications" element={<UserApplications />} />
        <Route path="/JobRecommendations" element={<JobRecommendations/>} />

        <Route path ="/ApplicationConfirmation" element={<ApplicationConfirmation />} />
        <Route path ="/JobSearch" element={<JobSearch />} />
        <Route path ="/ResumeUpload" element={<ResumeUpload />} />
        <Route path ="/ApplicationManagement" element={<ApplicationManagement />} />
        <Route path ="/AdminPanel" element={<AdminPanel />} />
        <Route path="/create" element={<CreateNotification />} />

          <Route path="/JobApplicationForm" element={<JobApplicationForm />} />


        {/* User-Specific Routes (Now Public) */}
        <Route path="/user-dashboard" element={<UserDashboard />} />


        {/* Recruiter-Specific Routes (Now Public) */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/JobApplicationsList" element={<JobApplicationsList />} />



        {/*Recruiter*/}
        <Route path="/JobPostForm" element={<JobPostForm />} />
        <Route path="/JobList" element={<JobList />} />
        <Route path="/CompanyForm" element={<CompanyForm />} />
        <Route path="/JobManagement" element={<JobManagement />} />
        <Route path="/CompanyList" element={<CompanyList />} />
        <Route path = "/ResumeViewer" element={<ResumeViewer />} />
        <Route path ="/JobSearch" element={<JobSearch />} />

        {/* Shared Routes */}
        <Route path="/notifications" element={<NotificationList />} />

        {/* Fallback Route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;