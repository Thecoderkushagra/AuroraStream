package com.TheCoderKushagra.repository;

import com.TheCoderKushagra.entity.Viewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ViewerRepository extends JpaRepository<Viewer, Long> {

    @Query("SELECT v FROM Viewer v JOIN FETCH v.user u WHERE u.id = :userId")
    Optional<Viewer> findByUserIdWithUser(@Param("userId") Long userId);
}
