package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
