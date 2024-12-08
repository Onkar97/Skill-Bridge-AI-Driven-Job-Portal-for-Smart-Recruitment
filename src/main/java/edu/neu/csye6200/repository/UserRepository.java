package edu.neu.csye6200.repository;

import edu.neu.csye6200.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    // Fetch user by userId
    @Query("SELECT u FROM UserEntity u WHERE u.userId = :userId")
    Optional<UserEntity> findByUserId(@Param("userId") Integer userId);

    // Fetch user by email
    @Query("SELECT u FROM UserEntity u WHERE u.email = :email")
    Optional<UserEntity> getUserByEmail(@Param("email") String email);

    // Find user by email and role (for login)
    @Query("SELECT u FROM UserEntity u WHERE u.email = :email AND u.role = :role")
    Optional<UserEntity> findByEmailAndRole(@Param("email") String email, @Param("role") String role);

    // Count total users
    @Query("SELECT COUNT(u) FROM UserEntity u")
    long getUserCount();

    // Update user details
    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET " +
            "u.password = :#{#userEntity.password}, " +
            "u.name = :#{#userEntity.name}, " +
            "u.gender = :#{#userEntity.gender}, " +
            "u.birthYear = :#{#userEntity.birthYear}, " +
            "u.nickname = :#{#userEntity.nickname}, " +
            "u.email = :#{#userEntity.email}, " +
            "u.province = :#{#userEntity.province}, " +
            "u.city = :#{#userEntity.city}, " +
            "u.eduDegree = :#{#userEntity.eduDegree}, " +
            "u.graduation = :#{#userEntity.graduation}, " +
            "u.graYear = :#{#userEntity.graYear}, " +
            "u.major = :#{#userEntity.major}, " +
            "u.dirDesire = :#{#userEntity.dirDesire}, " +
            "u.role = :#{#userEntity.role} " +
            "WHERE u.userId = :#{#userEntity.userId}")
    int updateUser(@Param("userEntity") UserEntity userEntity);
}
