package edu.neu.csye6200.service;

import edu.neu.csye6200.dto.NotificationRequest;
import edu.neu.csye6200.entity.NotificationEntity;
import edu.neu.csye6200.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Create a new notification
    public NotificationEntity createNotification(NotificationRequest notificationRequest) {
        NotificationEntity notification = new NotificationEntity(
                notificationRequest.getActivityType(),
                notificationRequest.getJobDescription(),
                notificationRequest.getUserEmail(),
                notificationRequest.getTimestamp()
        );
        return notificationRepository.save(notification);
    }

    // Get all notifications
    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }

    // Get notifications by user email
    public List<NotificationEntity> getNotificationsByUserEmail(String userEmail) {
        return notificationRepository.findByUserEmail(userEmail);
    }

    // Update a notification
    public NotificationEntity updateNotification(Integer notificationId, NotificationRequest notificationRequest) {
        Optional<NotificationEntity> notificationOptional = notificationRepository.findById(notificationId);
        if (notificationOptional.isPresent()) {
            NotificationEntity notification = notificationOptional.get();
            notification.setActivityType(notificationRequest.getActivityType());
            notification.setJobDescription(notificationRequest.getJobDescription());
            notification.setUserEmail(notificationRequest.getUserEmail());
            notification.setTimestamp(notificationRequest.getTimestamp());
            return notificationRepository.save(notification);
        }
        return null; // or throw an exception if preferred
    }

    // Delete a notification
    public boolean deleteNotification(Integer notificationId) {
        Optional<NotificationEntity> notificationOptional = notificationRepository.findById(notificationId);
        if (notificationOptional.isPresent()) {
            notificationRepository.delete(notificationOptional.get());
            return true;
        }
        return false;
    }
}
