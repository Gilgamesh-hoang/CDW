package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    List<Opinion> findByProduct_IdAndIsDeletedFalseOrderByCreateAtDesc(Long productId);
    
    @Query("SELECT o FROM Opinion o WHERE o.product.id = :productId AND o.isDeleted = false ORDER BY o.createAt DESC")
    List<Opinion> findLatestOpinionsByProductId(@Param("productId") Long productId);
} 