package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
