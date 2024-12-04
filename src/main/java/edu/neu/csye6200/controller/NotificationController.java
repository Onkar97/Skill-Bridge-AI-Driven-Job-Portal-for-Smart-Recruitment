package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.NotificationRequest;
import edu.neu.csye6200.entity.NotificationEntity;
import edu.neu.csye6200.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Create a notification
    @PostMapping
    public ResponseEntity<NotificationEntity> createNotification(@RequestBody NotificationRequest notificationRequest) {
        NotificationEntity notification = notificationService.createNotification(notificationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(notification);
    }

    // Get all notifications
    @GetMapping
    public ResponseEntity<List<NotificationEntity>> getAllNotifications() {
        List<NotificationEntity> notifications = notificationService.getAllNotifications();
        return notifications.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(notifications);
    }

    // Get notifications by user email
    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<NotificationEntity>> getNotificationsByUserEmail(@PathVariable String userEmail) {
        List<NotificationEntity> notifications = notificationService.getNotificationsByUserEmail(userEmail);
        return notifications.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(notifications);
    }

    // Update a notification
    @PutMapping("/{notificationId}")
    public ResponseEntity<NotificationEntity> updateNotification(@PathVariable Integer notificationId, @RequestBody NotificationRequest notificationRequest) {
        NotificationEntity updatedNotification = notificationService.updateNotification(notificationId, notificationRequest);
        return updatedNotification != null ? ResponseEntity.ok(updatedNotification) : ResponseEntity.notFound().build();
    }

    // Delete a notification
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Integer notificationId) {
        boolean isDeleted = notificationService.deleteNotification(notificationId);
        return isDeleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
