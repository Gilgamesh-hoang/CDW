package org.cdwbackend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.request.SizeRequest;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.entity.database.Size;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.SizeMapper;
import org.cdwbackend.repository.database.SizeRepository;
import org.cdwbackend.service.IProductSizeService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ISizeService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.module.ResolutionException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class SizeService implements ISizeService {
    IRedisService redisService;
    IProductSizeService productSizeService;
    SizeRepository sizeRepository;
    SizeMapper sizeMapper;
    ObjectMapper objectMapper;

    @Override
    public PageResponse<List<SizeDTO>> findAll(Pageable pageable) {
        String redisKey = RedisKeyUtil.getListSizesKey(pageable.getPageNumber(), pageable.getPageSize());

        try {
            // Check if the search results are already cached in Redis
            String jsonValue = redisService.getValue(redisKey, String.class);
            if (jsonValue != null) {
                return objectMapper.readValue(jsonValue, new TypeReference<PageResponse<List<SizeDTO>>>() {
                });
            }


            Page<Size> sizes = sizeRepository.findAll(Example.of(Size.builder().isDeleted(false).build()), pageable);

            PageResponse<List<SizeDTO>> results = PageResponse.<List<SizeDTO>>builder()
                    .currentPage(sizes.getNumber())
                    .totalPage(sizes.getTotalPages())
                    .data(sizeMapper.toDTOs(sizes.getContent()))
                    .build();

            redisService.saveValue(redisKey, objectMapper.writeValueAsString(results));
            redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

            return results;
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON", e);
        }
        return PageResponse.<List<SizeDTO>>builder().data(new ArrayList<>()).build();
    }

    @Override
    public boolean existsByName(String name) {
        Example<Size> example = Example.of(Size.builder().name(name).isDeleted(false).build());
        return sizeRepository.exists(example);
    }

    @Override
    public SizeDTO save(@Valid SizeRequest request) {
        if (existsByName(request.getName()))
            throw new IllegalArgumentException("Size with name " + request.getName() + " already exists");

        Long sizeId = request.getId();

        // add new size
        if (sizeId == null) {
            return sizeMapper.toDTO(sizeRepository.save(
                    Size.builder()
                            .name(request.getName())
                            .isDeleted(false)
                            .build())
            );
        }

        // update existing size
        Size size = sizeRepository.findById(sizeId)
                .orElseThrow(() -> new ResolutionException("Size with id " + sizeId + " not found"));

        size.setName(request.getName());
        return sizeMapper.toDTO(sizeRepository.save(size));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ResolutionException("Size with id " + id + " not found"));

        size.setIsDeleted(true);
        redisService.deleteByPattern(RedisKeyUtil.getListSizesKey(0, 0).substring(0, 10) + "*");
        sizeRepository.save(size);

        productSizeService.deleteBySizeId(id);
    }

    @Override
    public SizeDTO findById(Long id) {
        return sizeMapper.toDTO(sizeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Size with id " + id + " not found")));
    }
}
