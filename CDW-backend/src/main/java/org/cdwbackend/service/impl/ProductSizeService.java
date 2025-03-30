package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.entity.database.ProductSize;
import org.cdwbackend.entity.database.Size;
import org.cdwbackend.repository.database.ProductSizeRepository;
import org.cdwbackend.service.IProductSizeService;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductSizeService implements IProductSizeService {
    ProductSizeRepository productSizeRepository;

    @Override
    @Transactional
    public void deleteBySizeId(Long id) {
        List<ProductSize> sizes = productSizeRepository.findAllBySize(id);
        sizes.forEach(size -> size.setIsDeleted(true));
        productSizeRepository.saveAll(sizes);
    }
}
