import React, { useEffect, useState } from 'react';
import { fetchNotifications } from '../services/notificationService';

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications().then(setNotifications).catch(console.error);
    }, []);

    return (
        <div className="container">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
