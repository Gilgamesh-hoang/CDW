package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIdIn(List<Long> ids, Pageable pageable);

    @Query(value = "SELECT DISTINCT p.* " +
           "FROM products p " +
           "JOIN product_sizes ps ON ps.productId = p.id " +
           "JOIN order_details od ON od.productSizeId = ps.id " +
           "JOIN orders o ON od.orderId = o.id " +
           "WHERE o.createAt BETWEEN :startDate AND :endDate " +
           "AND p.isDeleted = false " +
           "AND o.isDeleted = false " +
           "ORDER BY (SELECT SUM(od2.quantity) " +
           "          FROM order_details od2 " +
           "          JOIN product_sizes ps2 ON od2.productSizeId = ps2.id " +
           "          WHERE ps2.productId = p.id) DESC " +
           "LIMIT 5", nativeQuery = true)
    List<Product> findTopSellingProducts(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
