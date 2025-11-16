package com.TheCoderKushagra.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.web.servlet.function.RequestPredicates.*;

@Configuration
public class GatewayRouterConfig {
    @Autowired
    private RequestService requestService;

    @Value("${route.user}")
    private String userService;

    // USER SERVICE
    @Bean
    public RouterFunction<ServerResponse> userServiceRouter() {
        return RouterFunctions

                // AUTH
                .route(POST("/user/auth/login").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.POST, userService, "/auth/login"))
                .andRoute(POST("/user/auth/signup").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.POST, userService, "/auth/signup"))
                .andRoute(POST("/user/auth/otp").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.POST, userService, "/auth/otp"))

                // VIEWER
                .andRoute(PUT("/user/viewer/update-viewer-username").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/viewer/update-viewer-username"))
                .andRoute(PUT("/user/viewer/update-viewer-password").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/viewer/update-viewer-password"))
                .andRoute(DELETE("/user/viewer/delete-viewer").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/viewer/delete-viewer"))
                // PUBLISHER
                // ADMIN
                // MASTER
                .andRoute(DELETE("/user/master/delete-this-admin").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/master/delete-this-admin"));
    }

    // META-DATA SERVICE
    @Bean
    public RouterFunction<ServerResponse> metadataService() {
        return null;
    }


}
