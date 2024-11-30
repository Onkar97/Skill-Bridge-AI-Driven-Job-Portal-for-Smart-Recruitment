package edu.neu.csye6200.repository;
import edu.neu.csye6200.entity.UserEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    // Additional query methods can be defined here
    @Query("SELECT u FROM UserEntity u WHERE u.user_id = :userId")
    Optional<UserEntity> findByUserId(Integer userId);

    @Query("SELECT u FROM UserEntity u WHERE u.mobile = :mobile")
    Optional<UserEntity> getUserByMobile(String mobile);

    // Count users
    @Query("SELECT COUNT(u) FROM UserEntity u")
    long getUserSize(); // Return type should be 'long' for count

    // Update user details
    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET " +
            "u.password = :#{#userEntity.password}, " +
            "u.name = :#{#userEntity.name}, " +
            "u.gender = :#{#userEntity.gender}, " +
            "u.birth_year = :#{#userEntity.birthYear}, " +
            "u.nickname = :#{#userEntity.nickname}, " +
            "u.email = :#{#userEntity.email}, " +
            "u.province = :#{#userEntity.province}, " +
            "u.city = :#{#userEntity.city}, " +
            "u.edu_degree = :#{#userEntity.eduDegree}, " +
            "u.graduation = :#{#userEntity.graduation}, " +
            "u.gra_year = :#{#userEntity.graYear}, " +
            "u.major = :#{#userEntity.major}, " +
            "u.dir_desire = :#{#userEntity.dirDesire} " +
            "WHERE u.user_id = :#{#userEntity.userId}")
    int updateUser(UserEntity userEntity);
}