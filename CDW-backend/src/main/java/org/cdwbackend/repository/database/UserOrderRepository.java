package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserOrderRepository extends JpaRepository<UserOrder, Long> {
    List<UserOrder> findByUser_Id(Long userId);
    List<UserOrder> findByOrder_Id(Long orderId);
    Optional<UserOrder> findByUser_IdAndOrder_Id(Long userId, Long orderId);

}
