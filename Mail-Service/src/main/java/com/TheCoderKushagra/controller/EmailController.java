package com.TheCoderKushagra.controller;

import com.TheCoderKushagra.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/simple")
    public ResponseEntity<String> simple(@RequestParam String to,
                                         @RequestParam String subject,
                                         @RequestParam String content) {
        emailService.sendSimpleMail(to, subject, content);
        return ResponseEntity.ok("Simple email sent successfully");
    }

    @PostMapping("/html")
    public ResponseEntity<String> html(@RequestParam String to,
                                       @RequestParam String subject,
                                       @RequestParam String content) {
        emailService.sendHtmlMail(to, subject, content);
        return ResponseEntity.ok("HTML email sent successfully");
    }
}
