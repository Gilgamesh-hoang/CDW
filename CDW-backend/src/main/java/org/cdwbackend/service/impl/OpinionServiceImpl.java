package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.OpinionDTO;
import org.cdwbackend.dto.request.CreateOpinionRequest;
import org.cdwbackend.entity.database.Opinion;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.entity.database.User;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.repository.database.OpinionRepository;
import org.cdwbackend.repository.database.ProductRepository;
import org.cdwbackend.repository.database.UserRepository;
import org.cdwbackend.service.IOpinionService;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OpinionServiceImpl implements IOpinionService {

    OpinionRepository opinionRepository;
    ProductRepository productRepository;
    UserRepository userRepository;
    SimpMessagingTemplate messagingTemplate;
    
    // Default avatar URL for users who don't have an avatar
    static final String DEFAULT_AVATAR_URL = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

    @Override
    @Transactional
    public OpinionDTO createOpinion(CreateOpinionRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Opinion opinion = new Opinion();
        opinion.setTitle(request.getTitle());
        opinion.setContent(request.getContent());
        opinion.setRating(request.getRating());
        opinion.setProduct(product);
        opinion.setUser(user);
        opinion.setIsDeleted(false);

        Opinion savedOpinion = opinionRepository.save(opinion);
        
        OpinionDTO opinionDTO = mapToDTO(savedOpinion);
        
        // Send the new opinion via WebSocket to subscribers of this product
        messagingTemplate.convertAndSend("/topic/product/" + product.getId() + "/opinions", opinionDTO);
        
        return opinionDTO;
    }

    @Override
    public List<OpinionDTO> getOpinionsByProductId(Long productId) {
        List<Opinion> opinions = opinionRepository.findByProduct_IdAndIsDeletedFalseOrderByCreateAtDesc(productId);
        return opinions.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OpinionDTO getOpinionById(Long id) {
        Opinion opinion = opinionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opinion not found"));
        return mapToDTO(opinion);
    }

    private OpinionDTO mapToDTO(Opinion opinion) {
        String userAvatar = DEFAULT_AVATAR_URL;
        return OpinionDTO.builder()
                .id(opinion.getId())
                .title(opinion.getTitle())
                .content(opinion.getContent())
                .rating(opinion.getRating())
                .productId(opinion.getProduct().getId())
                .userId(opinion.getUser().getId())
                .userName(opinion.getUser().getFullName())
                .userAvatar(userAvatar)
                .createAt(opinion.getCreateAt())
                .updateAt(opinion.getUpdateAt())
                .build();
    }
} 