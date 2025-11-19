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
                .andRoute(PUT("/user/publisher/update-pub-username").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/publisher/update-pub-username"))
                .andRoute(PUT("/user/publisher/update-pub-password").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/publisher/update-pub-password"))
                .andRoute(DELETE("/user/publisher/delete-pub").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/publisher/delete-pub"))

                // ADMIN
                .andRoute(GET("/user/admin/my-logs").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.GET, userService, "/admin/my-logs"))
                .andRoute(PUT("/user/admin/update-admin-username").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/admin/update-admin-username"))
                .andRoute(PUT("/user/admin/update-admin-password").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/admin/update-admin-password"))
                .andRoute(DELETE("/user/admin/delete-admin").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/admin/delete-admin"))

                .andRoute(POST("/user/admin/create-publisher").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.POST, userService, "/admin/create-publisher"))
                .andRoute(GET("/user/admin/all-publishers").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.GET, userService, "/admin/all-publishers"))
                .andRoute(DELETE("/user/admin/delete-this-pub").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/admin/delete-this-pub"))

                .andRoute(GET("/user/admin/all-viewer").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.GET, userService, "/admin/all-viewer"))
                .andRoute(DELETE("/user/admin/delete-this-viewer").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/admin/delete-this-viewer"))

                // MASTER
                .andRoute(DELETE("/user/master/delete-this-admin").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.DELETE, userService, "/master/delete-this-admin"))
                .andRoute(PUT("/user/master/update-master-password").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.PUT, userService, "/master/update-master-password"))
                .andRoute(POST("/user/master/create-admin").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.POST, userService, "/master/create-admin"))
                .andRoute(GET("/user/master/get-all-admin").and(accept(MediaType.APPLICATION_JSON)),
                        request -> requestService
                                .forwardRequest(request, HttpMethod.GET, userService, "/master/get-all-admin"));
    }

    // META-DATA SERVICE
    @Bean
    public RouterFunction<ServerResponse> metadataService() {
        return null;
    }


}
