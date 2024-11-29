package edu.neu.csye6200.service.impl;

import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.repository.UserRepository;
import edu.neu.csye6200.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger log = LogManager.getLogger(UserServiceImpl.class);
    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<UserEntity> findAll() {
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserEntity(Math.toIntExact(user.getUser_id()), user.getEmail(), user.getName(), user.getRole()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserEntity> getUser(int userId) {
        log.info("getUser");
        return userRepository.findByUserId(userId);
    }

    @Override
    public boolean updateUser(UserEntity userEntity) {
        return false;
    }

    @Override
    public boolean registerUser(UserEntity userEntity) {
        return false;
    }

    @Override
    public boolean loginUser(String mobile, String password) {
        return false;
    }

    @Override
    public UserEntity getUserByMobile(String mobile) {
        return null;
    }
}