package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
