package com.TheCoderKushagra.repository;

import com.TheCoderKushagra.entity.viewer.ViewerList;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ViewerListRepository extends MongoRepository<ViewerList, String> { }
