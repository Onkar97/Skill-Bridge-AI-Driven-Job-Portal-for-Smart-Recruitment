package edu.neu.csye6200.repository;
import edu.neu.csye6200.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    // Additional query methods can be defined here
    @Query("SELECT u FROM UserEntity u WHERE u.user_id = :userId")
    Optional<UserEntity> findByUserId(@Param("userId") Integer userId);
}