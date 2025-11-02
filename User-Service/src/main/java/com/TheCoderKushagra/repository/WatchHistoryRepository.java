package com.TheCoderKushagra.repository;

import com.TheCoderKushagra.entity.viewer.WatchHistory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WatchHistoryRepository extends MongoRepository<WatchHistory,String> {
}
