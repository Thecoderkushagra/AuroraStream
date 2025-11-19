package com.TheCoderKushagra.routes;

import com.TheCoderKushagra.jwt.JwtGatewayUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.io.IOException;

@Service
public class RequestService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private JwtGatewayUtil jwtUtil;

    public ServerResponse forwardRequest(ServerRequest request, HttpMethod method, String serviceUrl, String path) {
        try {
            // Read request body (empty for GET requests)
            String requestBody = "";
            if ( method == HttpMethod.POST || method == HttpMethod.PUT ||
                    method == HttpMethod.PATCH || method == HttpMethod.DELETE ) {
                requestBody = request.body(String.class);
            }

            // Prepare headers
            HttpHeaders newHeaders = new HttpHeaders();
            newHeaders.setContentType(MediaType.APPLICATION_JSON);

            // Copy original headers
            request.headers().asHttpHeaders().forEach((key, value) -> {
                if (!key.equalsIgnoreCase("host") &&
                        !key.equalsIgnoreCase("content-length")) {
                    newHeaders.put(key, value);
                }
            });

            String authHeader = request.headers().firstHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")){
                String jwt = authHeader.substring(7);
                String userId = jwtUtil.extractUserId(jwt);
                String username = jwtUtil.extractUsername(jwt);
                String roles = jwtUtil.extractRoles(jwt);

                // Add as custom headers
                newHeaders.add("X-User-Id", userId);
                newHeaders.add("X-Username", username);
                newHeaders.add("X-User-Roles", roles);
            }

            HttpEntity<String> entity = new HttpEntity<>(requestBody, newHeaders);

            // Make request to target service
            String targetUrl = serviceUrl + path;
            ResponseEntity<String> response = restTemplate.exchange(
                    targetUrl, method, entity, String.class
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
                    .body("Error connecting to service: " + e.getMessage());
        }
    }
}
