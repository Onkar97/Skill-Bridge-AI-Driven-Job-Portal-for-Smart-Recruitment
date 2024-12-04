package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.*;
import edu.neu.csye6200.repository.*;

import jakarta.transaction.Transactional;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
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


    public Iterable<UserEntity> findAll() {
        log.info("findall");
        return userRepository.findAll();
    }


    public Optional<UserEntity> getUser(int userId) {
        log.info("getUser");
        return userRepository.findByUserId(userId);
    }


    public boolean updateUser(UserEntity userEntity) {
        String password = userEntity.getPassword();

        int result = -1;
        try {
            String encPass = this.encodeByMd5(password);
            userEntity.setPassword(encPass);
            result = userRepository.updateUser(userEntity);
        } catch (NoSuchAlgorithmException e) {
            System.out.println("md5 failed");
        }

        if (result > 0) {
            return true;
        }
        return false;
    }


    @Transactional
    public boolean registerUser(UserEntity userEntity) {
        String email = userEntity.getEmail();
        if (userRepository.getUserByEmail(email).isPresent()) {
            return false;
        }

        String password = userEntity.getPassword();

        try {
            // Encrypt the password using MD5
            String encPass = this.encodeByMd5(password);
            userEntity.setPassword(encPass);

            // Save the user entity and flush the changes
            userEntity = userRepository.saveAndFlush(userEntity);

            ResumeEntity resume = new ResumeEntity();
            resume.setUserId(userEntity.getUserId());
            resumeRepository.save(resume);

            return true;

        } catch (NoSuchAlgorithmException e) {
            System.out.println("MD5 encryption error: " + e.getMessage());
        }

        return false;
    }


    public boolean loginUser(String email, String password) {
        if (userRepository.getUserByEmail(email).isEmpty()) {
            log.warn("no such user: " + email);
            return false;
        }
        String passwordDB = userRepository.getUserByEmail(email).get().getPassword();

        try {
            if (this.encodeByMd5(password).equals(passwordDB)) {
                return true;
            }
        } catch (NoSuchAlgorithmException e) {
            System.out.println("md5 wrong");
        }
        log.warn("password wrong" );
        return false;
    }


    public Optional<UserEntity> getUserByEmail(String email) {

        return  userRepository.getUserByEmail(email);
    }

    public String encodeByMd5(String str) throws NoSuchAlgorithmException {
        // Create MD5 MessageDigest instance
        MessageDigest md5 = MessageDigest.getInstance("MD5");

        // Calculate the MD5 digest
        byte[] digest = md5.digest(str.getBytes(StandardCharsets.UTF_8));

        // Encode the MD5 digest in Base64

        return Base64.getEncoder().encodeToString(digest);
    }
}
