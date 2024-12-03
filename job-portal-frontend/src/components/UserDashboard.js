import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '../services/userService';
import '../styles/dashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserDetails()
            .then(userData => {
                setUser(userData);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name}</h1>
                <span className="user-status">{user?.status || 'Active'}</span>
            </header>

            <div className="dashboard-content">
                <div className="card user-info">
                    <h2>Personal Information</h2>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Member Since:</strong> {user?.joinDate || 'N/A'}</p>
                    <p><strong>Last Login:</strong> {user?.lastLogin || 'N/A'}</p>
                </div>

                <div className="card user-stats">
                    <h2>Your Statistics</h2>
                    <div className="stat-grid">
                        <div className="stat-item">
                            <span className="stat-value">{user?.applications.length || 0}</span>
                            <span className="stat-label">Applications Submitted</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user?.interviewsScheduled || 0}</span>
                            <span className="stat-label">Interviews Scheduled</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{user?.offersReceived || 0}</span>
                            <span className="stat-label">Offers Received</span>
                        </div>
                    </div>
                </div>

                <div className="card recent-activity">
                    <h2>Recent Activity</h2>
                    <ul>
                        {user?.recentActivity?.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        )) || <li>No recent activity</li>}
                    </ul>
                </div>
            </div>

            <footer className="dashboard-footer">
                <button className="action-button">Update Profile</button>
                <button className="action-button">View All Applications</button>
            </footer>
        </div>
    );
};

export default UserDashboard;
