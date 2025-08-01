package org.cdwbackend.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.cdwbackend.constant.SystemConstant;
import org.cdwbackend.dto.OrderDTO;
import org.cdwbackend.dto.OrderDetailDTO;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.ApplyDiscountRequest;
import org.cdwbackend.dto.request.CreateOrderRequest;
import org.cdwbackend.dto.request.UpdateStatusOrderRequest;
import org.cdwbackend.dto.response.DiscountValidationResponse;
import org.cdwbackend.dto.response.PageResponse;
import org.cdwbackend.entity.database.*;
import org.cdwbackend.exception.ResourceNotFoundException;
import org.cdwbackend.mapper.*;
import org.cdwbackend.repository.database.*;
import org.cdwbackend.service.IOrderService;
import org.cdwbackend.service.IDiscountService;
import org.cdwbackend.service.IRedisService;
import org.cdwbackend.util.RedisKeyUtil;
import org.cdwbackend.util.SlugUtil;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class OrderService implements IOrderService {
    OrderRepository orderRepository;
    OrderDetailRepository orderDetailRepository;
    AddressRepository addressRepository;
    UserOrderRepository userOrderRepository;
    UserRepository userRepository;
    ProductSizeRepository productSizeRepository;

    OrderMapper orderMapper;
    AddressMapper addressMapper;
    OrderDetailMapper orderDetailMapper;
    ProductMapper productMapper;
    ProductSizeMapper productSizeMapper;

    IRedisService redisService;
    ObjectMapper objectMapper;
    private final IDiscountService discountService;

    @Override
    @Transactional
    public OrderDTO createOrder(Long userId, CreateOrderRequest request) {
        // 1. Create or fetch the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // 2. Create address using request data
        Address address = new Address();
        address.setFullName(request.getShippingAddress().getFullName());
        address.setPhoneNumber(request.getShippingAddress().getPhoneNumber());
        address.setProvince(request.getShippingAddress().getProvince());
        address.setDistrict(request.getShippingAddress().getDistrict());
        address.setCommune(request.getShippingAddress().getCommune());
        address.setHamlet(request.getShippingAddress().getHamlet());
        address.setIsDeleted(false);
        address = addressRepository.save(address);

        // 3. Create order with initial data
        Order order = Order.builder()
                .status(request.getStatus())
                .note(request.getNote())
                .address(address)
                .isPaid(false) // Default to not paid for COD
                .totalAmount(0.0) // Will be calculated later
                .isDeleted(false)
                .build();
        order = orderRepository.save(order);
        order.setSlug(SlugUtil.generateUniqueSlugByOrderId(order.getId()));
        order = orderRepository.save(order);

        // 4. Create order details and calculate subtotal
        List<OrderDetail> orderDetails = new ArrayList<>();
        double subtotal = 0.0;
        for (CreateOrderRequest.OrderItemRequest item : request.getOrderItems()) {
            ProductSize productSize = productSizeRepository.findById(item.getSizeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product size not found with id: " + item.getSizeId()));
            double subTotal = productSize.getPrice() * item.getQuantity();
            subtotal += subTotal;
            OrderDetail orderDetail = OrderDetail.builder()
                    .order(order)
                    .productSize(productSize)
                    .quantity(item.getQuantity())
                    .subTotal(subTotal)
                    .isDeleted(false)
                    .build();
            orderDetails.add(orderDetailRepository.save(orderDetail));
        }
        // 5. Áp dụng giảm giá nếu có
        double discountAmount = 0.0;
        Discount discount = null;
        if (request.getDiscountCode() != null && !request.getDiscountCode().isEmpty()) {
            List<Long> productIds = request.getOrderItems().stream().map(CreateOrderRequest.OrderItemRequest::getProductId).toList();
            double subtotalOrder = orderDetails.stream().mapToDouble(OrderDetail::getSubTotal).sum();
            DiscountValidationResponse validation = discountService.validateDiscount(request.getDiscountCode(), productIds, subtotalOrder);
            if (validation.isValid() && validation.getDiscount() != null) {
                discountAmount = validation.getDiscountAmount() != null ? validation.getDiscountAmount() : 0.0;
                discount = new Discount();
                discount.setId(validation.getDiscount().getId());
                // Tăng usageCount
                discountService.increaseUsageCount(discount.getId());
            }
        }
        // 6. Update total amount in order
        order.setSubtotalAmount(subtotal);
        order.setDiscountAmount(discountAmount);
        order.setTotalAmount(subtotal - discountAmount);
        if (discount != null) {
            order.setDiscount(discount);
        }
        order = orderRepository.save(order);

        // 7. Create user order relationship
        UserOrder userOrder = new UserOrder();
        userOrder.setUser(user);
        userOrder.setOrder(order);
        userOrder.setIsDeleted(false);
        userOrderRepository.save(userOrder);

        // 8. Clear cache
        redisService.deleteByPattern("order:*");

        // 9. Convert to DTO and return using mapper
        OrderDTO orderDTO = orderMapper.toDTO(order);
        orderDTO.setOrderDetails(orderDetailMapper.toDTOs(orderDetails));

        // 10. Cache the result
        String redisKey = RedisKeyUtil.getOrderKey(order.getId());
        redisService.saveValue(redisKey, orderDTO);

        return orderDTO;
    }

    @Override
    public OrderDTO findById(Long id) {
        String redisKey = RedisKeyUtil.getOrderKey(id);
        OrderDTO result = redisService.getValue(redisKey, OrderDTO.class);
        if (result != null) {
            return result;
        }

        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        // Get the list of order details associated with the order
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_Id(id);

        // Use mappers to convert entities to DTOs
        OrderDTO orderDTO = orderMapper.toDTO(order);
        List<OrderDetailDTO> orderDetailDTOs = orderDetailMapper.toDTOs(orderDetails);
        orderDTO.setOrderDetails(orderDetailDTOs);

        // Set product details for the UI
        List<ProductDTO> productDTOs = orderDetails.stream().map(detail -> {
            ProductDTO productDTO = productMapper.toDTO(detail.getProductSize().getProduct());
            ProductSize productSize = detail.getProductSize();
            Size sizeModel = productSize.getSize();

            // Set additional product details
            productDTO.setQuantity(detail.getQuantity());
            productDTO.setSizeName(sizeModel.getName());
            productDTO.setSizeId(sizeModel.getId());
            productDTO.setPrice(productSize.getPrice());
            productDTO.setProductSizeId(productSize.getId());
            productDTO.setAvailable(productSize.getAvailable());
            productDTO.setSubTotal(detail.getSubTotal());

            // Clear large text fields not needed in cart/order views
            productDTO.setShortDescription(null);
            productDTO.setContent(null);

            return productDTO;
        }).collect(Collectors.toList());

        orderDTO.setListProduct(productDTOs);

        // Cache the result
        redisService.saveValue(redisKey, orderDTO);
        redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

        return orderDTO;
    }

    @Override
    public OrderDTO getDetailById(Long id) {
        String redisKey = RedisKeyUtil.getOrderKey(id);
        OrderDTO result = redisService.getValue(redisKey, OrderDTO.class);
        if (result != null) {
            return result;
        }

        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        // Get the list of order details associated with the order
        List<OrderDetail> orderDetail = order.getOrderDetails();

        // Map each order detail to a ProductDTO and collect them into a list
        List<ProductDTO> listProduct = orderDetail.stream().map(detail -> {
            // Convert the product entity to a ProductDTO
            ProductDTO productDTO = productMapper.toDTO(detail.getProductSize().getProduct());
            ProductSize productSize = detail.getProductSize();
            Size sizeModel = productSize.getSize();

            // Set the product details in the ProductDTO
            productDTO.setQuantity(detail.getQuantity());
            productDTO.setSizeName(sizeModel.getName());
            productDTO.setSizeId(sizeModel.getId());
            productDTO.setPrice(productSize.getPrice());
            productDTO.setProductSizeId(productSize.getId());
            productDTO.setAvailable(productSize.getAvailable());
            productDTO.setSubTotal(detail.getSubTotal());
            productDTO.setShortDescription(null); // Set short description to null
            productDTO.setContent(null); // Set content to null

            return productDTO; // Return the populated ProductDTO
        }).toList();

        // Map the order entity to an OrderDTO
        OrderDTO orderDTO = orderMapper.toDTO(order);
        // Set the list of products in the OrderDTO
        orderDTO.setListProduct(listProduct);

        redisService.saveValue(redisKey, orderDTO);

        // Return the OrderDTO
        return orderDTO;
    }

    @Override
    public PageResponse<List<OrderDTO>> findAll(Pageable pageable) {
        String redisKey = RedisKeyUtil.getOrdersKey(pageable.getPageNumber(), pageable.getPageSize());
        try {
            // Check if the search results are already cached in Redis
            String jsonValue = redisService.getValue(redisKey, String.class);
            if (jsonValue != null) {
                return objectMapper.readValue(jsonValue, new TypeReference<PageResponse<List<OrderDTO>>>() {
                });
            }

            // Get orders with pagination, filtering out deleted orders
            Page<Order> orders = orderRepository.findAll(Example.of(Order.builder().isDeleted(false).build()), pageable);

            // Use mapper to convert to DTOs
            List<OrderDTO> orderDTOs = orders.getContent().stream()
                    .map(order -> {
                        OrderDTO dto = orderMapper.toDTO(order);
                        List<OrderDetail> details = orderDetailRepository.findByOrder_Id(order.getId());
                        dto.setOrderDetails(orderDetailMapper.toDTOs(details));
                        return dto;
                    })
                    .collect(Collectors.toList());

            // Build page response
            PageResponse<List<OrderDTO>> results = PageResponse.<List<OrderDTO>>builder()
                    .currentPage(pageable.getPageNumber() + 1)
                    .totalPage(orders.getTotalPages())
                    .data(orderDTOs)
                    .build();

            // Cache the results
            redisService.saveValue(redisKey, objectMapper.writeValueAsString(results));
            redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

            return results;
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON", e);
        }
        return PageResponse.<List<OrderDTO>>builder().data(new ArrayList<>()).build();
    }

    @Override
    public List<OrderDTO> findByUserId(Long userId) {
        String redisKey = RedisKeyUtil.getUserOrdersKey(userId);
        try {
            // Check if the user orders are already cached
            String jsonValue = redisService.getValue(redisKey, String.class);
            if (jsonValue != null) {
                return objectMapper.readValue(jsonValue, new TypeReference<List<OrderDTO>>() {
                });
            }

            // Get user orders
            List<UserOrder> userOrders = userOrderRepository.findByUser_Id(userId);

            // Convert to DTOs using mappers
            List<OrderDTO> orderDTOs = userOrders.stream()
                    .map(userOrder -> {
                        Order order = userOrder.getOrder();
                        OrderDTO dto = orderMapper.toDTO(order);
                        List<OrderDetail> details = orderDetailRepository.findByOrder_Id(order.getId());
                        dto.setOrderDetails(orderDetailMapper.toDTOs(details));
                        return dto;
                    })
                    .collect(Collectors.toList());

            // Cache the results
            redisService.saveValue(redisKey, objectMapper.writeValueAsString(orderDTOs));
            redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

            return orderDTOs;
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON", e);
            return new ArrayList<>();
        }
    }

    @Override
    public OrderDTO findByIdAndUserId(Long id, Long userId) {
        // Check if user has this order
        userOrderRepository.findByOrder_IdAndUser_IdAndIsDeletedFalse(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found or does not belong to the user"));

        // Use the standard findById method to retrieve and map the order
        return findById(id);
    }

    @Override
    @Transactional
    public OrderDTO updateStatus(UpdateStatusOrderRequest request) {
        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findById(request.getId()).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        String currentStatus = order.getStatus();
        String newStatus = request.getStatus();

        // Check if the status transition is valid, throw an exception if not
        if (!isValidStatusTransition(currentStatus, newStatus)) {
            throw new IllegalArgumentException("Invalid status transition");
        }

        // Update the status of the order
        order.setStatus(newStatus);

        // Mark as paid if delivered
        if (newStatus.equals(SystemConstant.ORDER_DELIVERED)) {
            order.setIsPaid(true);
        }

        order = orderRepository.save(order);

        // Clear cache
        redisService.deleteByPattern("order:*");

        // Convert to DTO using mapper
        OrderDTO orderDTO = orderMapper.toDTO(order);
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_Id(order.getId());
        orderDTO.setOrderDetails(orderDetailMapper.toDTOs(orderDetails));

        return orderDTO;
    }

    @Override
    @Transactional
    public OrderDTO cancelOrder(Long id, Long userId) {
        UserOrder userOrder = userOrderRepository.findByUser_IdAndOrder_Id(userId, id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id + " for user: " + userId));

        Order order = userOrder.getOrder();

        // Only allow cancellation if the order is in PROCESSING state
        if (!order.getStatus().equals(SystemConstant.ORDER_PROCESSING)) {
            throw new IllegalStateException("Cannot cancel order that is not in processing state");
        }

        order.setStatus(SystemConstant.ORDER_CANCELED);
        order = orderRepository.save(order);

        // Clear cache
        redisService.deleteByPattern("order:*");

        // Convert to DTO using mapper
        OrderDTO orderDTO = orderMapper.toDTO(order);
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrder_Id(order.getId());
        orderDTO.setOrderDetails(orderDetailMapper.toDTOs(orderDetails));

        return orderDTO;
    }


    // Validate if the status transition is allowed
    private boolean isValidStatusTransition(String currentStatus, String newStatus) {
        // Do not allow changes if the order is already delivered or canceled
        if (currentStatus.equals(SystemConstant.ORDER_DELIVERED) || currentStatus.equals(SystemConstant.ORDER_CANCELED)) {
            return false;
        }

        // Do not allow transitioning back to processing from transporting
        if (currentStatus.equals(SystemConstant.ORDER_TRANSPORTING) && newStatus.equals(SystemConstant.ORDER_PROCESSING)) {
            return false;
        }

        // Allow all other transitions
        return true;
    }

    @Override
    public OrderDTO findBySlug(String slug) {
        String redisKey = RedisKeyUtil.getOrderSlugKey(slug);
        OrderDTO result = redisService.getValue(redisKey, OrderDTO.class);
        if (result != null) {
            return result;
        }

        // Retrieve the order from the repository, throw an exception if not found
        Order order = orderRepository.findBySlugAndIsDeletedFalse(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // Get order details using the existing findById method
        OrderDTO orderDTO = findById(order.getId());

        // Cache the result with the slug key
        redisService.saveValue(redisKey, orderDTO);
        redisService.setTTL(redisKey, 30, TimeUnit.MINUTES);

        return orderDTO;
    }
}
