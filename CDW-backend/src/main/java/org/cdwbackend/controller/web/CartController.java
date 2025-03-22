package org.cdwbackend.controller.web;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.dto.CustomUserSecurity;
import org.cdwbackend.dto.ProductDTO;
import org.cdwbackend.dto.request.CartRequest;
import org.cdwbackend.dto.response.ResponseObject;
import org.cdwbackend.service.ICartService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("${API_PREFIX}/cart")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CartController {
    ICartService cartService;

    @GetMapping
    public ResponseObject<List<ProductDTO>> getCart(@AuthenticationPrincipal CustomUserSecurity user) {
        List<ProductDTO> productList = cartService.getCartByUser(user.getId());
        return new ResponseObject<>(HttpStatus.OK, productList);
    }

    @PostMapping
    public ResponseObject<String> addOrUpdateCart(@AuthenticationPrincipal CustomUserSecurity user,
                                                  @RequestBody @Valid CartRequest request) {
        if (request.getQuantity() == null|| request.getQuantity() < 1){
            request.setQuantity(1);
        }
        cartService.updateCart(user.getId(), request);
        return new ResponseObject<>(HttpStatus.OK, "Add product to cart successfully");
    }

    @DeleteMapping
    public ResponseObject<String> deleteCart(@AuthenticationPrincipal CustomUserSecurity user,
                                             @RequestBody @Valid CartRequest request) {
        cartService.deleteCart(user.getId(), request.getProductId(), request.getSizeId());
        return new ResponseObject<>(HttpStatus.OK, "Delete product from cart successfully");
    }

}
