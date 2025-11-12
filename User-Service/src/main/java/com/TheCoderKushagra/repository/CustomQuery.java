package com.TheCoderKushagra.repository;

import com.TheCoderKushagra.entity.Roles;
import com.TheCoderKushagra.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomQuery {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<UserEntity> getAll(int theRole) {
        Query query = new Query();

        Roles myRole = switch (theRole) {
            case 1 -> Roles.VIEWER;
            case 2 -> Roles.PUBLISHER;
            case 3 -> Roles.ADMIN;
            default -> throw new IllegalStateException("Unexpected value: " + theRole);
        };
        query.addCriteria(Criteria.where("role").is(myRole));
        return mongoTemplate.find(query, UserEntity.class);
    }
}
