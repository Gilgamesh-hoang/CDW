package org.cdwbackend.service;

import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.CartRequest;

import java.util.List;

public interface ICartService {

    List<ProductDTO> getCartByUser(Long userId);

    void updateCart(Long userId, CartRequest request);

    void deleteCart(Long userId, Long productId, Long sizeId);
}
