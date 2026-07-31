package com.TheCoderKushagra.dto;

import com.TheCoderKushagra.entity.Genre;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeriesRequest {
    private String seriesName;
    private String seriesDesc;
    private List<Genre> genres;
    private String publisherName;
}
