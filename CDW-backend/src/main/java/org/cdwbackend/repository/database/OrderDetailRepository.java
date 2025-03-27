package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.OrderDetail;
import org.cdwbackend.entity.database.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    @Query("""
            SELECT od.productSize.product
            FROM OrderDetail od
            GROUP BY od.productSize.product.id
            ORDER BY SUM(od.quantity) DESC
            """)
    List<Product> findProductsByBestSelling(Pageable pageable);
}
