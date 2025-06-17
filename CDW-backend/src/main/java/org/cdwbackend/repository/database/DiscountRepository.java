package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    Optional<Discount> findByCodeAndIsDeletedFalse(String code);
    
    @Query("SELECT d FROM Discount d WHERE d.isActive = true AND d.isDeleted = false " +
           "AND d.startDate <= :currentDate AND d.endDate >= :currentDate")
    List<Discount> findAllActiveDiscounts(@Param("currentDate") Date currentDate);
    
    @Query("SELECT d FROM Discount d WHERE d.isActive = true AND d.isDeleted = false " +
           "AND d.startDate <= :currentDate AND d.endDate >= :currentDate " +
           "AND (d.usageLimit IS NULL OR d.usageCount < d.usageLimit)")
    List<Discount> findAllValidDiscounts(@Param("currentDate") Date currentDate);
    
    @Query("SELECT d FROM Discount d WHERE d.isActive = true AND d.isDeleted = false " +
           "AND d.code = :code AND d.startDate <= :currentDate AND d.endDate >= :currentDate " +
           "AND (d.usageLimit IS NULL OR d.usageCount < d.usageLimit)")
    Optional<Discount> findValidDiscountByCode(@Param("code") String code, @Param("currentDate") Date currentDate);
} 