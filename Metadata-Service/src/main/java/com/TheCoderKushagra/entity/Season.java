package com.TheCoderKushagra.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "season")
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "content_id", nullable = false)
    private VideoContent content;

    private Integer seasonNumber;
}

