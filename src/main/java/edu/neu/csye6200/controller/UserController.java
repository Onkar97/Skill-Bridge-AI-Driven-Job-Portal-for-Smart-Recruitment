package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.LoginRequest;
import edu.neu.csye6200.dto.RegisterRequest;
import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private static final Logger log = LogManager.getLogger(UserService.class);

    @Autowired
    private UserService userService;

    // Endpoint to get all users
    @GetMapping("/all")
    public Iterable<UserEntity> findAllUsers() {
        log.info("Fetching all users");
        return userService.findAll();
    }

    // Endpoint to get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Integer id) {
        Optional<UserEntity> user = userService.getUser(id);

        if (user.isPresent()) {
            log.info("User found with ID: {}", id);
            return ResponseEntity.ok(user.get());
        } else {
            log.warn("User not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to fetch user details by email
    @GetMapping("/find")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        log.info("Fetching user details for email: {}", email);

        if (email == null || email.isEmpty()) {
            log.warn("Email is missing in request");
            return ResponseEntity.badRequest().body("Email is required.");
        }

        Optional<UserEntity> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            log.info("User found with email: {}", email);
            return ResponseEntity.ok(user.get());
        } else {
            log.warn("No user found with email: {}", email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
    }

    // Endpoint to register a new user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        log.info("Processing registration request for email: {}", registerRequest.getEmail());

        // Validate mandatory fields
        if (registerRequest.getEmail() == null || registerRequest.getPassword() == null || registerRequest.getName() == null) {
            log.warn("Mandatory fields missing in registration request");
            return ResponseEntity.badRequest().body("Missing mandatory fields: email, password, or name");
        }

        // Create a UserEntity from the request
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setPassword(registerRequest.getPassword());
        userEntity.setNickname(registerRequest.getName());
        userEntity.setName(registerRequest.getName());
        userEntity.setGender(registerRequest.getGender());
        userEntity.setBirthYear(registerRequest.getBirthYear());
        userEntity.setMobile(registerRequest.getMobile());
        userEntity.setProvince(registerRequest.getProvince());
        userEntity.setCity(registerRequest.getCity());
        userEntity.setEduDegree(registerRequest.getEduDegree());
        userEntity.setGraduation(registerRequest.getGraduation());
        userEntity.setGraYear(registerRequest.getGraYear());
        userEntity.setMajor(registerRequest.getMajor());
        userEntity.setDirDesire(registerRequest.getDirDesire());
        userEntity.setRole(registerRequest.getRole());

        // Attempt to register the user
        boolean isRegistered = userService.registerUser(userEntity);
        if (isRegistered) {
            log.info("User registered successfully with email: {}", registerRequest.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } else {
            log.warn("Registration failed. Email already exists: {}", registerRequest.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
    }

    // Endpoint to log in a user
    @PostMapping("/login")
    public ResponseEntity<UserEntity> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null || loginRequest.getRole() == null) {
            return ResponseEntity.badRequest().build();
        }

        return userService.loginUser(
                loginRequest.getEmail(),
                loginRequest.getPassword(),
                loginRequest.getRole()
        ).map(user -> {
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

}
