package com.TheCoderKushagra.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "content_rating")
public class ContentRating {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String code; // PG-13, R, etc.
    private String description;
}

