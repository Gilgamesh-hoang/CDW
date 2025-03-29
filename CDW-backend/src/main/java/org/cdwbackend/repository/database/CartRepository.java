package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId and c.orderDetail.order is null ORDER BY c.createAt DESC")
    List<Cart> getCartByUser(@Param("userId") Long userId);

    @Query("SELECT c FROM Cart c WHERE c.user.id = :userId and c.orderDetail.order is null and c.orderDetail.productSize.id = :productSizeId")
    Cart findCartItemByUser(@Param("userId") Long userId, @Param("productSizeId") Long productSizeId);
}
