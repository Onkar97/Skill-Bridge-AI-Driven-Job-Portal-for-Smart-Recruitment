import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import JobList from './components/JobList';
import JobApplicationForm from './components/JobApplicationForm';
import NotificationList from './components/NotificationList';
import UserDashboard from './components/UserDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/apply-job" element={<JobApplicationForm />} />
                <Route path="/notifications" element={<NotificationList />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;





