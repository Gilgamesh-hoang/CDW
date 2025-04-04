package org.cdwbackend.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.exception.JwtAuthenticationEntryPoint;
import org.cdwbackend.service.IKeyService;
import org.cdwbackend.service.impl.JwtService;
import org.cdwbackend.service.impl.UserDetailServiceImpl;
import org.cdwbackend.util.EndPoint;
import org.cdwbackend.util.JwtHelper;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/*
The JwtRequestFilter extends the Spring Web Filter OncePerRequestFilter class. For any incoming request this Filter
class gets executed. It checks if the request has a valid JWT token. If it has a valid JWT Token then it sets the
 Authentication in the context, to specify that the current user is authenticated.
 */

@Component
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
@RequiredArgsConstructor
@Slf4j
public class JwtRequestFilter extends OncePerRequestFilter {
    IKeyService keyService;
    UserDetailServiceImpl userDetailService;
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    JwtService jwtService;
    JwtHelper jwtHelper;
    EndPoint endPoint;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String requestPath = request.getRequestURI();
        // Kiểm tra xem request có cần xác thực không
        boolean requiresAuthentication = isAuthenticationRequired(requestPath);
        if (!requiresAuthentication) {
            chain.doFilter(request, response); // Bỏ qua filter nếu không cần xác thực
            return;
        }

        final String requestTokenHeader = request.getHeader("Authorization");

        String email = null;
        String jwtToken = null;
        // JWT Token is in the form "Bearer token". Remove Bearer word and get
        // only the Token
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring("Bearer ".length());
            try {
                email = jwtHelper.extractEmailFromPayload(jwtToken);
            } catch (IllegalArgumentException e) {
                log.warn("Unable to get JWT Token");
                throw new IllegalArgumentException("Unable to get JWT Token");
            }
        } else {
            log.warn("JWT Token does not begin with Bearer String");
            throw new IllegalArgumentException("JWT Token does not begin with Bearer String");
        }

        // Once we get the token validate it.
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            CustomUserSecurity userDetails = (CustomUserSecurity) userDetailService.loadUserByUsername(email);
            String publicKey = keyService.getKeyPairByUser(userDetails.getId()).getPublicKey();
            // if token is valid configure Spring Security to manually set
            // authentication
            try {
                if (jwtService.validateToken(jwtToken, publicKey)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    // After setting the Authentication in the context, we specify
                    // that the current user is authenticated. So it passes the
                    // Spring Security Configurations successfully.
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (ExpiredJwtException e) {
                log.warn("JWT Token has expired during validation");
                AuthenticationException authException = new AuthenticationServiceException("JWT Token has expired", e);
                jwtAuthenticationEntryPoint.commence(request, response, authException);
                return;
            }
        }
        chain.doFilter(request, response);
    }

    // Kiểm tra xem request có cần xác thực không
    private boolean isAuthenticationRequired(String requestPath) {
        // Kiểm tra admin endpoints
        if (requestPath.startsWith("/api/v1/admin/")) {
            return true;
        }
        // Kiểm tra authenticated endpoints
        for (String pattern : endPoint.authenticatedEndpoints()) {
            AntPathMatcher matcher = new AntPathMatcher();
            if (matcher.match(pattern, requestPath)) {
                return true;
            }
        }
        return false;
    }
}
