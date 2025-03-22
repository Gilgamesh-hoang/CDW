package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIdIn(List<Long> ids, Pageable pageable);

    @Query("""
            SELECT DISTINCT p FROM Product p
            JOIN p.productSizes ps
            WHERE p.category.id IN :categoryIds
            AND ps.size.id IN :sizeIds
            AND p.id IN :productIds
            """)
    List<Product> findAllByCategoryAndSize(@Param("productIds") List<Long> productIds,
                                           @Param("categoryIds") List<Long> categoryIds,
                                           @Param("sizeIds") List<Long> sizeIds,
                                           Pageable pageable);
}
