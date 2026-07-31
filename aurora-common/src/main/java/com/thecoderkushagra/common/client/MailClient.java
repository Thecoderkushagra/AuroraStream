package com.thecoderkushagra.common.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "MAIL-SERVICE")
public interface MailClient {
    @PostMapping("/email/simple")
    void sendSimpleMail(@RequestParam String to, @RequestParam String subject, @RequestParam String content);

    @PostMapping("/email/html")
    void sendHtmlMail(@RequestParam String to, @RequestParam String subject, @RequestParam String content);
}
