package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.ResumeEntity;
import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.repository.ResumeRepository;
import edu.neu.csye6200.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger log = LogManager.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    /**
     * Retrieve all users.
     */
    public Iterable<UserEntity> findAll() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    /**
     * Retrieve user by userId.
     */
    public Optional<UserEntity> getUser(int userId) {
        log.info("Fetching user with ID: {}", userId);
        return userRepository.findByUserId(userId);
    }

    /**
     * Update user information.
     */
    public boolean updateUser(UserEntity userEntity) {
        try {
            String password = userEntity.getPassword();
            String encPass = encodeByMd5(password); // Encrypt the password
            userEntity.setPassword(encPass);

            int result = userRepository.updateUser(userEntity);
            log.info("User update result for ID {}: {}", userEntity.getUserId(), result > 0);
            return result > 0;

        } catch (NoSuchAlgorithmException e) {
            log.error("MD5 encryption failed during update: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Register a new user.
     */
    @Transactional
    public boolean registerUser(UserEntity userEntity) {
        String email = userEntity.getEmail();

        // Check if email already exists
        if (userRepository.getUserByEmail(email).isPresent()) {
            log.warn("User registration failed: Email already exists: {}", email);
            return false;
        }

        try {
            // Encrypt the password
            String encPass = encodeByMd5(userEntity.getPassword());
            userEntity.setPassword(encPass);

            // Save the user entity
            UserEntity savedUser = userRepository.save(userEntity);

            if (savedUser == null || savedUser.getUserId() == null) {
                log.error("Failed to save user during registration: {}", email);
                return false;
            }

            // Create and save the resume entity
            ResumeEntity resume = new ResumeEntity();
            resume.setUserId(savedUser.getUserId());
            resumeRepository.save(resume);

            log.info("User registered successfully: {}", email);
            return true;

        } catch (NoSuchAlgorithmException e) {
            log.error("Error encrypting password during registration for {}: {}", email, e.getMessage());
            return false;
        } catch (Exception e) {
            log.error("Unexpected error during registration for {}: {}", email, e.getMessage());
            return false;
        }
    }

    /**
     * Log in a user with email, password, and role validation.
     */
    public Optional<UserEntity> loginUser(String email, String password, String role) {
        Optional<UserEntity> userOptional = userRepository.getUserByEmail(email);

        if (userOptional.isEmpty()) {
            log.warn("Login failed: No such user with email: {}", email);
            return Optional.empty();
        }

        UserEntity user = userOptional.get();

        try {
            // Validate password
            if (!encodeByMd5(password).equals(user.getPassword())) {
                log.warn("Login failed: Password mismatch for email: {}", email);
                return Optional.empty();
            }
        } catch (NoSuchAlgorithmException e) {
            log.error("Password hashing error during login: {}", e.getMessage());
            return Optional.empty();
        }

        // Validate role
        if (!role.equalsIgnoreCase(user.getRole())) {
            log.warn("Login failed: Role mismatch for email: {}", email);
            return Optional.empty();
        }

        log.info("Login successful for email: {}", email);
        return Optional.of(user);
    }

    /**
     * Retrieve user by email.
     */
    public Optional<UserEntity> getUserByEmail(String email) {
        log.info("Fetching user by email: {}", email);
        return userRepository.getUserByEmail(email);
    }

    /**
     * Encode a string using MD5 and Base64.
     */
    private String encodeByMd5(String str) throws NoSuchAlgorithmException {
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        byte[] digest = md5.digest(str.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(digest);
    }
}
