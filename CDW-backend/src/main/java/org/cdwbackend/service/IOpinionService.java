package org.cdwbackend.service;

import org.cdwbackend.dto.OpinionDTO;
import org.cdwbackend.dto.request.CreateOpinionRequest;

import java.util.List;

public interface IOpinionService {
    OpinionDTO createOpinion(CreateOpinionRequest request, Long userId);
    List<OpinionDTO> getOpinionsByProductId(Long productId);
    OpinionDTO getOpinionById(Long id);
} 