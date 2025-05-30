package org.cdwbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.ProductDTO;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {
    private int totalUsers;
    private int totalProducts;
    private int totalOrders;
    private int totalRevenue;
    private int totalCategories;
    
    // For chart data - sales by date
    @Builder.Default
    private List<SalesData> salesData = new ArrayList<>();
    
    @Builder.Default
    private List<ProductDTO> topProducts = new ArrayList<>();
    
    // Recent orders
    @Builder.Default
    private List<OrderDTO> recentOrders = new ArrayList<>();
}
