package com.TheCoderKushagra.service;

import com.TheCoderKushagra.dto.SeriesRequest;
import com.TheCoderKushagra.entity.Series;
import com.TheCoderKushagra.repository.SeriesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class SeriesService {

    @Autowired
    private SeriesRepository seriesRepository;

    public String saveSeries(SeriesRequest request) {
        try {
            // Validate input
            if (request.getSeriesName() == null || request.getSeriesName().trim().isEmpty()) {
                return "error: Series name cannot be empty";
            }

            if (request.getGenres() == null || request.getGenres().isEmpty()) {
                return "error: At least one genre must be specified";
            }

            // Build and save series
            Series series = Series.builder()
                    .seriesName(request.getSeriesName())
                    .seriesDesc(request.getSeriesDesc())
                    .genres(new ArrayList<>(request.getGenres()))
                    .publisherName(request.getPublisherName())
                    .episodes(new ArrayList<>())
                    .totalEpisodes(0)
                    .build();

            Series savedSeries = seriesRepository.save(series);

            log.info("Series saved successfully with ID: {}", savedSeries.getId());

            return "Series '" + savedSeries.getSeriesName() + "' created successfully with ID: " + savedSeries.getId();

        } catch (Exception e) {
            log.error("Error saving series", e);
            return "error: Failed to save series - " + e.getMessage();
        }
    }

    public Series getSeriesById(String id) {
        return seriesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Series not found with ID: " + id));
    }

    public List<Series> getAllSeries() {
        return seriesRepository.findAll();
    }

    public String updateSeries(String id, SeriesRequest request) {
        try {
            Series series = seriesRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Series not found with ID: " + id));

            if (request.getSeriesName() != null) {
                series.setSeriesName(request.getSeriesName());
            }
            if (request.getSeriesDesc() != null) {
                series.setSeriesDesc(request.getSeriesDesc());
            }
            if (request.getGenres() != null && !request.getGenres().isEmpty()) {
                series.setGenres(new ArrayList<>(request.getGenres()));
            }
            if (request.getPublisherName() != null) {
                series.setPublisherName(request.getPublisherName());
            }

            seriesRepository.save(series);

            return "Series updated successfully";

        } catch (Exception e) {
            log.error("Error updating series", e);
            return "error: Failed to update series - " + e.getMessage();
        }
    }

    public String deleteSeries(String id) {
        try {
            if (!seriesRepository.existsById(id)) {
                return "error: Series not found with ID: " + id;
            }

            seriesRepository.deleteById(id);
            log.info("Series deleted successfully with ID: {}", id);

            return "Series deleted successfully";

        } catch (Exception e) {
            log.error("Error deleting series", e);
            return "error: Failed to delete series - " + e.getMessage();
        }
    }
}