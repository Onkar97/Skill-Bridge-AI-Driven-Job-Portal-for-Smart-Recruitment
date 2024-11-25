package edu.neu.csye6200.service.impl;

import edu.neu.csye6200.entity.UserEntity;
import edu.neu.csye6200.service.UserService;
import edu.neu.csye6200.repository.UserRepository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger log = LogManager.getLogger(UserServiceImpl.class);
    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<UserEntity> findAll() {
        log.info("findall");
        return userRepository.findAll();
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
