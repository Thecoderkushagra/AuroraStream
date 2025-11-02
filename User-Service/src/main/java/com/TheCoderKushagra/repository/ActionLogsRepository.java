package com.TheCoderKushagra.repository;

import com.TheCoderKushagra.entity.admin.ActionLogs;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActionLogsRepository extends MongoRepository<ActionLogs, String> {
}
