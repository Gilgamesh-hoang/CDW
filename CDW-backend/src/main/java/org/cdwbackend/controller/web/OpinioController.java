package org.cdwbackend.controller.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.OpinionDTO;
import org.cdwbackend.dto.request.CreateOpinionRequest;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.IOpinionService;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("WebOpinionController")
@RequestMapping("${API_PREFIX}/opinions")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class OpinioController {
    
    IOpinionService opinionService;
    SimpMessagingTemplate messagingTemplate;
    
    @GetMapping("/product/{productId}")
    public ResponseObject<List<OpinionDTO>> getOpinionsByProductId(@PathVariable Long productId) {
        List<OpinionDTO> opinions = opinionService.getOpinionsByProductId(productId);
        return new ResponseObject<>(HttpStatus.OK, opinions);
    }
    
    @PostMapping
    public ResponseObject<OpinionDTO> createOpinion(
            @AuthenticationPrincipal CustomUserSecurity user,
            @Valid @RequestBody CreateOpinionRequest request) {
        OpinionDTO createdOpinion = opinionService.createOpinion(request, user.getId());
        return new ResponseObject<>(HttpStatus.CREATED, createdOpinion);
    }
    
    // WebSocket endpoint to handle opinions in real-time
    @MessageMapping("/opinions/create")
    public void handleOpinionCreation(
            @AuthenticationPrincipal CustomUserSecurity user,
            CreateOpinionRequest request) {
        OpinionDTO createdOpinion = opinionService.createOpinion(request, user.getId());
        // The message will be sent to subscribers via the service
    }
    
    // WebSocket endpoint to subscribe to specific product opinions
    @MessageMapping("/opinions/product/{productId}")
    @SendTo("/topic/product/{productId}/opinions")
    public OpinionDTO subscribeToProductOpinions(@DestinationVariable Long productId) {
        // This is just a subscription endpoint, no data is returned here
        // Clients will receive messages when opinions are created
        return null;
    }
}
