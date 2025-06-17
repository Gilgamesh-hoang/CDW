package org.cdwbackend.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.response.DashboardResponse;
import org.cdwbackend.dto.response.SalesData;
import org.cdwbackend.entity.database.Order;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.mapper.OrderMapper;
import org.cdwbackend.mapper.ProductMapper;
import org.cdwbackend.mapper.SalesDataMapper;
import org.cdwbackend.repository.database.CategoryRepository;
import org.cdwbackend.repository.database.OrderRepository;
import org.cdwbackend.repository.database.ProductRepository;
import org.cdwbackend.repository.database.UserRepository;
import org.cdwbackend.service.IDashboardService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DashboardService implements IDashboardService {
    UserRepository userRepository;
    ProductRepository productRepository;
    OrderRepository orderRepository;
    CategoryRepository categoryRepository;
    ProductMapper productMapper;
    OrderMapper orderMapper;
    SalesDataMapper salesDataMapper;
    private final ProductService productService;

    @Override
    public DashboardResponse getDashboard(LocalDate startDate, LocalDate endDate) {
        // Create response object
        DashboardResponse response = new DashboardResponse();
        
        // Convert LocalDate to Date for repository queries
        Date startDateAsDate = Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDateAsDate = Date.from(endDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        
        // Set basic statistics using Lombok's generated setters
        response.setTotalUsers((int) userRepository.count());
        response.setTotalProducts((int) productRepository.count());
        response.setTotalOrders((int) orderRepository.count());
        response.setTotalRevenue(orderRepository.getTotalRevenue(startDateAsDate, endDateAsDate));
        response.setTotalCategories((int) categoryRepository.count());
        
        // Get sales data for chart
        response.setSalesData(getSalesData(startDateAsDate, endDateAsDate));
        
        // Get top selling products
        Pageable pageable = PageRequest.of(0, 5);
        response.setTopProducts(productService.getBestSellerProducts(pageable));
        
        // Get recent orders
        response.setRecentOrders(getRecentOrders());
        
        return response;
    }
    
    /**
     * Get sales data for the chart
     */
    private List<SalesData> getSalesData(Date startDate, Date endDate) {
        List<Object[]> rawSalesData = orderRepository.getSalesDataByDateRange(startDate, endDate);
        List<SalesData> salesDataList = new ArrayList<>();

        for (Object[] row : rawSalesData) {
            String date = (String) row[0];
            int revenue = ((Number) row[1]).intValue();
            int orders = ((Number) row[2]).intValue();

            salesDataList.add(new SalesData(date, revenue, orders));
        }

        return salesDataList;
    }
    
    /**
     * Get recent orders
     */
    private List<OrderDTO> getRecentOrders() {
        List<Order> recentOrders = orderRepository.findRecentOrders();
        
        // Use OrderMapper to convert entities to DTOs
        return orderMapper.toDTOs(recentOrders);
    }
}
