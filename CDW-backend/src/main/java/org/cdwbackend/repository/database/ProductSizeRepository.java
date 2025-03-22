package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {

    @Query("SELECT ps FROM ProductSize ps WHERE ps.product.id = :productId ORDER BY ps.price ASC")
    List<ProductSize> findByProductId(@Param("productId") Long productId);
}
