package edu.neu.csye6200.controller;

import edu.neu.csye6200.dto.LoginRequest;
import edu.neu.csye6200.dto.NotificationRequest;
import edu.neu.csye6200.dto.RegisterRequest;
import edu.neu.csye6200.entity.*;
import edu.neu.csye6200.service.*;

import jakarta.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

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
        userEntity.setEmail(registerRequest.getEmail());
        userEntity.setPassword(registerRequest.getPassword());
        userEntity.setNickname(registerRequest.getName());

        if (!userService.registerUser(userEntity)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping(value = "/login")
    @ResponseBody
    public ResponseEntity<Void> userLogin(HttpSession httpSession, @RequestBody LoginRequest loginRequest) {
        log.warn(12345);
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword())) {
            log.warn(userService.getUserByEmail(loginRequest.getEmail()));
            httpSession.setAttribute("user", userService.getUserByEmail(loginRequest.getEmail()).get());
            log.warn("login success");

            UserEntity user = (UserEntity) httpSession.getAttribute("user");
            log.warn(user.getEmail());
            log.warn(httpSession.toString());

            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.badRequest().build();
    }

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
}
