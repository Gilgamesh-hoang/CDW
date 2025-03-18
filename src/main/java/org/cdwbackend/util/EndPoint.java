package org.cdwbackend.util;

import org.springframework.stereotype.Component;

@Component
public class EndPoint {

    public final String[] publicGetEndpoints() {
        return new String[]{
                "/swagger-ui/**",
                "/api-docs/**",
                "/api/v1/home",
                "/api/v1/categories",
        };
    }

    public final String[] publicPostEndpoints() {
        return new String[]{
                "/api/v1/auth/login",
                "/api/v1/auth/refresh-token",
                "/api/v1/search"
        };
    }
}
