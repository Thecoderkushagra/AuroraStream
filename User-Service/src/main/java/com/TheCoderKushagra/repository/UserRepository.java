package com.TheCoderKushagra.repository;

import com.TheCoderKushagra.entity.UserEntity;
import com.TheCoderKushagra.entity.viewer.ViewerList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserEntity, String> { }

