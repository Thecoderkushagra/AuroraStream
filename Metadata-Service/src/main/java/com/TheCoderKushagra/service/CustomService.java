package com.TheCoderKushagra.service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

@Slf4j
@Service
public class CustomService {
    @Value("${path.temp}")
    private String Temp;
    @Value("${path.stream}")
    private String Hls;

    @PostConstruct
    public void Init() throws IOException {
        File file0 = new File(Temp);
        File file1 = new File(Hls);

        if(!file0.exists()){
            boolean mkdir = file0.mkdir();
            log.info("FILE {} CREATED", file0);
        }else {
            log.info("FILE {} ALREADY EXISTS", file0);

        }if(!file1.exists()){
            boolean mkdir = file1.mkdir();
            log.info("FILE CREATED: {}", file1);
        }else {
            log.info("FILE {} ALREADY EXISTS", file1);
        }
    }

    // add top series to redis service===============>

}
