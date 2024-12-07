package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.LoginRequest;
import edu.neu.csye6200.dto.RegisterRequest;
import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.service.ResumeService;
import edu.neu.csye6200.service.UserService;

import jakarta.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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
        try {
            if (registerRequest.getEmail() == null || registerRequest.getPassword() == null ||
                    registerRequest.getName() == null || registerRequest.getRole() == null) {
                return ResponseEntity.badRequest().build();
            }

            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(registerRequest.getEmail());
            userEntity.setPassword(registerRequest.getPassword());
            userEntity.setName(registerRequest.getName());
            userEntity.setGender(registerRequest.getGender());
            userEntity.setBirthYear(registerRequest.getBirthYear());
            userEntity.setRole(String.valueOf(registerRequest.getRole()));

            if (!userService.registerUser(userEntity)) {
                return ResponseEntity.badRequest().build();
            }

            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            log.error("Error during user registration: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> userLogin(HttpSession httpSession, @RequestBody LoginRequest loginRequest) {
        // Validate input
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null || loginRequest.getRole() == null) {
            return ResponseEntity.badRequest().body("Email, password, and role are required.");
        }

        // Attempt login
        boolean isValid = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword(), loginRequest.getRole());

        if (isValid) {
            // Optionally, create a session or token
            httpSession.setAttribute("user", loginRequest.getEmail());
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email, password, or role.");
        }
    }

}
