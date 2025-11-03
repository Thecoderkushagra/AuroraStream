package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.ViewerRequest;
import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViewerService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity saveCustomer(ViewerRequest request) {
        UserEntity entity = UserEntity.builder()
                .userName(request.getUserName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Roles.VIEWER)
                .build();
        return userRepository.save(entity);
    }

    public UserEntity changeUsername() {
        return null;
    }

    public UserEntity changePassword() {
        return null;
    }

    public void deleteUser() {

    }
}
