package org.cdwbackend.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateOrderRequest {
    
    @Valid
    @NotNull(message = "Shipping address is required")
    AddressRequest shippingAddress;
    
    @NotNull(message = "Payment method is required")
    String paymentMethod;
    
    @Valid
    @NotEmpty(message = "Order items cannot be empty")
    List<OrderItemRequest> orderItems;
    
    String note;
    
    // This will be set by the controller
    String status;
    
    @Data
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class AddressRequest {
        
        @NotNull(message = "Full name is required")
        String fullName;
        
        @NotNull(message = "Phone number is required")
        String phoneNumber;
        
        @NotNull(message = "Province is required")
        String province;
        
        @NotNull(message = "District is required")
        String district;
        
        @NotNull(message = "Commune/Ward is required")
        String commune;
        
        @NotNull(message = "Specific address is required")
        String hamlet;
    }
    
    @Data
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class OrderItemRequest {
        
        @NotNull(message = "Product ID is required")
        Long productId;
        
        @NotNull(message = "Size ID is required")
        Long sizeId;
        
        @NotNull(message = "Quantity is required")
        Integer quantity;
    }
}