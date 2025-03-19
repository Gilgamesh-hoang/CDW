package org.cdwbackend.service.impl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.request.SizeRequest;
import org.cdwbackend.entity.database.Size;
import org.cdwbackend.mapper.SizeMapper;
import org.cdwbackend.repository.database.SizeRepository;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.service.ISizeService;
import org.cdwbackend.util.RedisKeyUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SizeService implements ISizeService {
    IRedisService redisService;
    SizeRepository sizeRepository;
    SizeMapper sizeMapper;

    @Override
    public List<SizeDTO> findAll(Pageable pageable) {
        String redisKey = RedisKeyUtil.getListSizesKey(pageable.getPageNumber(), pageable.getPageSize());
        List<SizeDTO> sizes = redisService.getList(redisKey, SizeDTO.class);
        if (sizes != null) {
            return sizes;
        }

        sizes = sizeMapper.toDTOs(sizeRepository.findAll(pageable).getContent());
        redisService.saveList(redisKey, sizes);
        redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

        return sizes;
    }

    @Override
    public boolean existsByName(String name) {
        return sizeRepository.findByName(name) != null;
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
    public void delete(Long id) {
        Size size = sizeRepository.findById(id)
                .orElseThrow(() -> new ResolutionException("Size with id " + id + " not found"));

        size.setIsDeleted(true);
        redisService.deleteByPattern(RedisKeyUtil.getListSizesKey(0, 0).substring(0, 10));
        sizeRepository.save(size);
    }
}
