package com.TheCoderKushagra.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "User-Service", url = "http://localhost:9000/user")
public interface UserClient {
    @GetMapping("/publisher/get/studioName")
    String getStudioName(@RequestParam("userId") String id);
}
