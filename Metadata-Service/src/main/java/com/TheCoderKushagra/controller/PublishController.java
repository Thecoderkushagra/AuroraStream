package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.client.UserClient;
import com.TheCoderKushagra.dto.EpisodeRequest;
import com.TheCoderKushagra.dto.MovieRequest;
import com.TheCoderKushagra.dto.SeriesRequest;
import com.TheCoderKushagra.entity.Series;
import com.TheCoderKushagra.service.EpisodeService;
import com.TheCoderKushagra.service.MovieService;
import com.TheCoderKushagra.service.SeriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/publish")
@CrossOrigin(origins = "*")
public class PublishController {
    @Autowired
    private MovieService movieService;
    @Autowired
    private EpisodeService episodeService;
    @Autowired
    private SeriesService seriesService;

    @Autowired
    private UserClient userClient;

    //===================
    // MOVIES ACTIONS
    //===================
    @PostMapping("/movie")
    public ResponseEntity<String> savePuri(
            @RequestParam("videoFile") MultipartFile video,
            @RequestParam("title") String title,
            @RequestParam("desc") String desc,
            @RequestHeader("X-User-Id") String Id
    ){
        String studioName = userClient.getStudioName(Id);
        MovieRequest build = MovieRequest.builder()
                .title(title)
                .description(desc)
                .publisherName(studioName)
                .build();

        String s = movieService.saveMovie(build, video);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    //============================
    // EPISODE AND SERIES ACTIONS
    //============================
    @PostMapping
    public ResponseEntity<String> createSeries(@RequestBody SeriesRequest request) {
        String result = seriesService.saveSeries(request);
        if (result.startsWith("error:")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<Series>> getAllSeries() {
        return ResponseEntity.ok(seriesService.getAllSeries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Series> getSeriesById(@PathVariable String id) {
        try {
            return ResponseEntity.ok(seriesService.getSeriesById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSeries(
            @PathVariable String id,
            @RequestBody SeriesRequest request
    ) {
        String result = seriesService.updateSeries(id, request);
        if (result.startsWith("error:")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSeries(@PathVariable String id) {
        String result = seriesService.deleteSeries(id);
        if (result.startsWith("error:")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/episodes/upload")
    public ResponseEntity<String> uploadEpisode(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("seriesId") String seriesId,
            @RequestParam("episodeNumber") Integer episodeNumber,
            @RequestPart("video") MultipartFile video
    ) {
        EpisodeRequest metadata = EpisodeRequest.builder()
                .title(title)
                .description(description)
                .seriesId(seriesId)
                .episodeNumber(episodeNumber)
                .build();

        String result = episodeService.saveEpisode(metadata, video);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
