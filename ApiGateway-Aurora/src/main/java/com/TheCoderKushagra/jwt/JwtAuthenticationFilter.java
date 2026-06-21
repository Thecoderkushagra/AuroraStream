package com.TheCoderKushagra.jwt;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtGatewayUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain
    ) throws ServletException, IOException {

        // Extract JWT from Authorization header
        final String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                logger.error("Failed to extract username from JWT", e);
            }
        }

        // If token exists and no authentication is set yet
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Validate token (NO DB LOOKUP - only signature and expiration check)
            if (jwtUtil.validateToken(jwt)) {
                String role = jwtUtil.extractRoles(jwt);// Extract roles from JWT
                // Convert role to GrantedAuthority (Role already includes "ROLE_" prefix)
                List<SimpleGrantedAuthority> authorities = (role != null) 
                        ? List.of(new SimpleGrantedAuthority(role)) 
                        : Collections.emptyList();
                // Create authentication token
                var authToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Set authentication in SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
