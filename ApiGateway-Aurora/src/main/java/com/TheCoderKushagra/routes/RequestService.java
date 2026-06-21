package com.TheCoderKushagra.routes;

import com.TheCoderKushagra.jwt.JwtGatewayUtil;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import java.io.IOException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RequestService {
    private final RestTemplate restTemplate;
    private final JwtGatewayUtil jwtUtil;

    private static final Set<HttpMethod> METHODS_WITH_BODY = Set.of(
            HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH, HttpMethod.DELETE
    );

    public ServerResponse forwardRequest(
            ServerRequest request,
            HttpMethod method,
            String serviceUrl,
            String path
    ) {
        try {
            // 1. Read the request body (only for methods that typically carry a body)
            String requestBody = readRequestBodyIfPresent(request, method);

            // 2. Build headers for the outgoing request
            HttpHeaders outgoingHeaders = buildOutgoingHeaders(request);

            // 3. Add JWT information as custom headers if an Authorization header exists
            addJwtHeadersIfPresent(request, outgoingHeaders);

            // 4. Execute the request to the target service
            String targetUrl = serviceUrl + path;
            HttpEntity<String> entity = new HttpEntity<>(requestBody, outgoingHeaders);
            ResponseEntity<String> response = restTemplate.exchange(targetUrl, method, entity, String.class);

            // 5. Return the target service's response
            String responseBody = response.getBody() != null ? response.getBody() : "";
            return ServerResponse
                    .status(response.getStatusCode())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(responseBody);

        } catch (IOException e) {
            return ServerResponse
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error reading request body: " + e.getMessage());

        } catch (Exception e) {
            return ServerResponse
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("Error connecting to the target service: " + e.getMessage());
        }
    }

    private String readRequestBodyIfPresent(
            ServerRequest request, HttpMethod method
    ) throws IOException, ServletException {
        if (METHODS_WITH_BODY.contains(method)) {
            return request.body(String.class);
        }
        return "";
    }

    private HttpHeaders buildOutgoingHeaders(ServerRequest request) {
        HttpHeaders outgoingHeaders = new HttpHeaders();
        outgoingHeaders.setContentType(MediaType.APPLICATION_JSON);

        request.headers().asHttpHeaders().forEach((key, values) -> {
            if (!key.equalsIgnoreCase("host") && !key.equalsIgnoreCase("content-length")) {
                outgoingHeaders.put(key, values);
            }
        });

        return outgoingHeaders;
    }

    private void addJwtHeadersIfPresent(ServerRequest request, HttpHeaders outgoingHeaders) {
        String authHeader = request.headers().firstHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String userId = jwtUtil.extractUserId(jwt);
            String username = jwtUtil.extractUsername(jwt);
            String roles = jwtUtil.extractRoles(jwt);

            outgoingHeaders.add("X-User-Id", userId);
            outgoingHeaders.add("X-Username", username);
            outgoingHeaders.add("X-User-Roles", roles);
        }
    }
}