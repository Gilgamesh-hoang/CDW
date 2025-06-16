package org.cdwbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${application.frontend.url}")
    private String frontendUrl;
    
    @Value("${API_PREFIX}")
    private String apiPrefix;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic"); // Broker prefix
        config.setApplicationDestinationPrefixes("/app"); // Application prefix
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register the endpoint with the API prefix
        registry.addEndpoint(apiPrefix + "/ws")
                .setAllowedOrigins(frontendUrl)
                .withSockJS();
        
        // Also register without the prefix for backward compatibility
        registry.addEndpoint("/ws")
                .setAllowedOrigins(frontendUrl)
                .withSockJS();
        
        // Add debugging info to logs
        System.out.println("WebSocket endpoints registered: " + apiPrefix + "/ws and /ws");
        System.out.println("Allowed origins: " + frontendUrl);
    }
} 