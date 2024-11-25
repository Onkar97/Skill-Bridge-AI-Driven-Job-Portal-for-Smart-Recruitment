package edu.neu.csye6200.service;

import edu.neu.csye6200.entity.UserEntity;

import java.util.Optional;

public interface UserService {
    Optional<UserEntity> getUser(int userId);

    public Iterable<UserEntity> findAll();

    boolean updateUser(UserEntity userEntity);

    boolean registerUser(UserEntity userEntity);

    boolean loginUser(String mobile, String password);

    UserEntity getUserByMobile(String mobile);
}
