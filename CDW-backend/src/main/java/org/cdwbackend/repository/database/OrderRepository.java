package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import org.cdwbackend.dto.response.SalesData;
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.createAt BETWEEN :startDate AND :endDate AND o.isDeleted = false")
    int getTotalRevenue(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
    
    @Query(value = "SELECT * FROM orders o WHERE o.isDeleted = false ORDER BY o.createAt DESC LIMIT 10", nativeQuery = true)
    List<Order> findRecentOrders();
    
    @Query(value = "SELECT DATE_FORMAT(o.createAt, '%Y-%m-%d') as date, " +
           "COALESCE(SUM(o.totalAmount), 0) as revenue, " +
           "COUNT(o.id) as orders " +
           "FROM orders o " +
           "WHERE o.createAt BETWEEN :startDate AND :endDate " +
           "AND o.isDeleted = false " +
           "GROUP BY DATE_FORMAT(o.createAt, '%Y-%m-%d') " +
           "ORDER BY date", nativeQuery = true)
    List<SalesData[]> getSalesDataByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
