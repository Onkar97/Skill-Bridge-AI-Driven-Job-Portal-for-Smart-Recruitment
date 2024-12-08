package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.LoginRequest;
import edu.neu.csye6200.dto.NotificationRequest;
import edu.neu.csye6200.dto.RegisterRequest;
import edu.neu.csye6200.dto.UpdateRequest;
import edu.neu.csye6200.entity.*;
import edu.neu.csye6200.service.*;

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
    @Autowired
    private ResumeService resumeService;

    @GetMapping("/all")
    public Iterable<UserEntity> findAllEmployees() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Integer id) {
        Optional<UserEntity> user = userService.getUser(id);

        return user.map(ResponseEntity::ok)
                .orElseGet(() -> {
                    log.warn("User not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PostMapping(value = "/register")
    @ResponseBody
    public ResponseEntity<Void> userRegister(@RequestBody RegisterRequest registerRequest) {

        if (registerRequest.getEmail() == null || registerRequest.getPassword() == null ) {
            return ResponseEntity.badRequest().build();
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setName(registerRequest.getName());
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setPassword(registerRequest.getPassword());
        userEntity.setBirthYear(registerRequest.getBirthYear());
        userEntity.setGender(registerRequest.getGender());
        userEntity.setRole(registerRequest.getRole());

        if (!userService.registerUser(userEntity)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(value = "/login")
    @ResponseBody
    public ResponseEntity<Void> userLogin(HttpSession httpSession, @RequestBody LoginRequest loginRequest) {
        log.warn("Processing login request");

        // Validate required fields
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null || loginRequest.getRole() == null) {
            log.warn("Missing login fields");
            return ResponseEntity.badRequest().build();
        }

        // Call loginUser with all required parameters
        if (userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getRole())) {
            httpSession.setAttribute("user", userService.getUserByEmail(loginRequest.getEmail()).get());
            log.warn("Login successful");
            return ResponseEntity.status(HttpStatus.OK).build();
        }

        log.warn("Login failed");
        return ResponseEntity.badRequest().build();
    }

    // me 1.name 2.email 3.applications 4.interviewsScheduled 5.offersReceived
    @GetMapping(value = "/me")
    @ResponseBody
    public ResponseEntity<?> getUserInfo(HttpSession session) {

        UserEntity user = (UserEntity) session.getAttribute("user");
        log.warn(user);
        if (user == null) {
            log.warn("User not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
        log.warn(user.getEmail());

        return ResponseEntity.ok(user); // Send user details back to the frontend
    }

    @PostMapping(value = "/update")
    @ResponseBody
    public ResponseEntity<?> getUserInfo(HttpSession httpSession, @RequestBody UpdateRequest updateRequest) {

        // Retrieve the currently authenticated user from the session
        UserEntity user = (UserEntity) httpSession.getAttribute("user");
        log.warn("User: {}", user);

        if (user == null) {
            log.warn("User not authenticated");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        // Update the user's information based on the UpdateRequest object
        // Here you map the fields of the updateRequest to the user entity.
        user.setMobile(updateRequest.getMobile());
        user.setName(updateRequest.getName());
        user.setPassword(updateRequest.getPassword());
        user.setGender(updateRequest.getGender());
        user.setBirthYear(updateRequest.getBirthYear());
        user.setCity(updateRequest.getCity());
        user.setGraduation(updateRequest.getGraduation());
        user.setMajor(updateRequest.getMajor());

        // Optionally, you may want to perform some validation or checks before saving

        // Call a service to save the updated user entity to the database
        //userService.save(user);  // Assuming you have a service to persist the updated user

        log.info("User info updated successfully: {}", user);

        // Send the updated user object back in the response
        return ResponseEntity.ok(user);  // Send user details back to the frontend
    }
}
