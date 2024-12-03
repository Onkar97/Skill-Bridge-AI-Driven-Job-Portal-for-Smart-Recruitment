export const fetchNotifications = async () => {
    const response = await fetch('http://localhost:8080/api/notifications'); // Update with your API URL
    if (!response.ok) {
        throw new Error('Failed to fetch notifications');
    }
    return await response.json();
};