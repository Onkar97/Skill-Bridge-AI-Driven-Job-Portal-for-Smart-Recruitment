package edu.neu.csye6200.controller;

import edu.neu.csye6200.entity.*;
import edu.neu.csye6200.service.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")

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

    @PostMapping(value = "/registerPost")
    @ResponseBody
    public int userRegister(@RequestParam String mobile, @RequestParam String password, @RequestParam String nickName) {

        if (mobile == null || password == null || nickName == null) {
            log.warn("123");
            return 0;
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setMobile(mobile);
        userEntity.setPassword(password);
        userEntity.setNickname(nickName);

        if (!userService.registerUser(userEntity)) {
            log.warn("3");
            return 0;
        }

        return 1;
    }
}
