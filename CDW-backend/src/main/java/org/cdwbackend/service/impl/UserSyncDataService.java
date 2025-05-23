package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.entity.elastic.ProductDocument;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.ProductMapper;
import org.cdwbackend.repository.database.ProductRepository;
import org.cdwbackend.repository.elastic.ProductElasticRepo;
import org.cdwbackend.service.IProductSyncDataService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserSyncDataService implements IProductSyncDataService {
    ProductRepository productRepository;
    ProductElasticRepo productElasticRepo;
    ProductMapper productMapper;

    @Override
    public void createProduct(long id) {
        Product product = validateProductRepo(id);
        ProductDocument productDocument = productElasticRepo.findById(id).orElse(null);
        if (productDocument != null) {
            throw new IllegalArgumentException("Product already exists in ElasticSearch");
        }

        productElasticRepo.save(productMapper.toDocument(product));
    }

    @Override
    public void updateProduct(long id) {
        ProductDocument productDocument = validateProductDocument(id);
        Product product = validateProductRepo(id);
        productMapper.updateProductDocumentFromProduct(productDocument, product);
        productElasticRepo.save(productDocument);
    }

    @Override
    public void deleteProduct(long id) {
        productElasticRepo.delete(validateProductDocument(id));
    }

    private Product validateProductRepo(long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private ProductDocument validateProductDocument(long id) {
        return productElasticRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
}
