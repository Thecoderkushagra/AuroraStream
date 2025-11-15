package com.TheCoderKushagra.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.io.IOException;

import static org.springframework.web.servlet.function.RequestPredicates.*;

@Configuration
public class GatewayRouterConfig {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${route.user}")
    private String userService;

    // USER-SERVICE
    @Bean
    public RouterFunction<ServerResponse> userServiceRouter() {
        return RouterFunctions
                .route(POST("/user/auth/login").and(accept(MediaType.APPLICATION_JSON)),
                        request -> {
                            try {
                                // Read request body
                                String requestBody = request.body(String.class);

                                // Prepare headers
                                HttpHeaders headers = new HttpHeaders();
                                headers.setContentType(MediaType.APPLICATION_JSON);

                                // Copy original headers if needed
                                request.headers().asHttpHeaders().forEach((key, value) -> {
                                    if (!key.equalsIgnoreCase("host") &&
                                            !key.equalsIgnoreCase("content-length")) {
                                        headers.put(key, value);
                                    }
                                });

                                HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

                                // Make request to User-Service
                                ResponseEntity<String> response = restTemplate.exchange(
                                        "http://localhost:9000/user/auth/login",
                                        HttpMethod.POST,
                                        entity,
                                        String.class
                                );

                                // Return response
                                return ServerResponse
                                        .status(response.getStatusCode())
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .body(response.getBody() != null ? response.getBody() : "");

                            } catch (IOException e) {
                                return ServerResponse
                                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("Error reading request: " + e.getMessage());
                            } catch (Exception e) {
                                return ServerResponse
                                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                                        .body("Error connecting to User-Service: " + e.getMessage());
                            }
                        });
    }


    @Bean
    public RouterFunction<ServerResponse> securedUserServiceRouter() {
        return RouterFunctions
                .route(GET("/user/admin/all-viewer").and(accept(MediaType.APPLICATION_JSON)),
                        request -> {
                            try {
                                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                                System.out.println("SecurityContextHolder :"+authentication);
                                String requestBody = request.body(String.class);

                                HttpHeaders nweHeaders = new HttpHeaders();
                                nweHeaders.setContentType(MediaType.APPLICATION_JSON);

                                request.headers().asHttpHeaders().forEach((key, value) -> {
                                    if (!key.equalsIgnoreCase("host") &&
                                            !key.equalsIgnoreCase("content-length")) {
                                        nweHeaders.put(key, value);
                                    }
                                });

                                nweHeaders.add("test", "Successful");

                                HttpEntity<String> entity = new HttpEntity<>(requestBody, nweHeaders);

                                ResponseEntity<String> response = restTemplate.exchange(
                                        "http://localhost:9000/user/admin/all-viewer",
                                        HttpMethod.GET,
                                        entity,
                                        String.class
                                );

                                return ServerResponse
                                        .status(response.getStatusCode())
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .body(response.getBody() != null ? response.getBody() : "");

                            } catch (IOException e) {
                                return ServerResponse
                                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("Error reading request: " + e.getMessage());
                            } catch (Exception e) {
                                return ServerResponse
                                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                                        .body("Error connecting to User-Service: " + e.getMessage());
                            }
                        });
//                .filter(securityHandlerFilter);
    }

}
