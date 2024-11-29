package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {

    // Find notifications by user email
    List<NotificationEntity> findByUserEmail(String userEmail);

}
