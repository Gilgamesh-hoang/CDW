package org.cdwbackend.service.impl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.SizeDTO;
import org.cdwbackend.dto.request.SizeRequest;
import org.cdwbackend.entity.database.Size;
import org.cdwbackend.mapper.SizeMapper;
import org.cdwbackend.repository.database.SizeRepository;
import org.cdwbackend.service.ISizeService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.module.ResolutionException;
import java.util.List;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SizeService implements ISizeService {
    SizeRepository sizeRepository;
    SizeMapper sizeMapper;

    @Override
    public List<SizeDTO> findAll(Pageable pageable) {
        return sizeMapper.toDTOs(sizeRepository.findAll(pageable).getContent());
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
        sizeRepository.save(size);

    }
}
