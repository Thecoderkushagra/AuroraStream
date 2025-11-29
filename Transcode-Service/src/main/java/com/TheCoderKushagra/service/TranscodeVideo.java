package com.TheCoderKushagra.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class TranscodeVideo {
    @KafkaListener(topics = "transcode")
    private void bull(){
    }
}
