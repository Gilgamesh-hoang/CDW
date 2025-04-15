package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.ProductImage;
import org.cdwbackend.entity.database.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    @Query("SELECT pa FROM ProductImage pa WHERE pa.product.id = :productId ORDER BY pa.createAt DESC")
    List<ProductImage> findByProductId(@Param("productId") Long productId);
}
