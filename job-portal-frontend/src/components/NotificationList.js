import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../service/notificationService';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (err) {
                console.error("Error fetching notifications:", err);
                setError("Failed to load notifications. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    if (loading) {
        return <div className="container">Loading notifications...</div>;
    }

    if (error) {
        return <div className="container error">{error}</div>;
    }

    return (
        <div className="container">
            <h2>Notifications</h2>
            <ul>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <li key={notification.id}>
                            <p>Activity: {notification.activityType}</p>
                            <p>Description: {notification.jobDescription}</p>
                            <p>User: {notification.userEmail}</p>
                            <p>Time: {new Date(notification.timestamp).toLocaleString()}</p>
                        </li>
                    ))
                ) : (
                    <p>No notifications available.</p>
                )}
            </ul>
        </div>
    );
};

export default NotificationList;