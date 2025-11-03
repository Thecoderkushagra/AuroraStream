package com.TheCoderKushagra.service;

import com.TheCoderKushagra.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PublisherService {
    @Autowired
    private UserRepository userRepository;


}
