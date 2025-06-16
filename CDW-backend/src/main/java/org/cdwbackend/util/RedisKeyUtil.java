package org.cdwbackend.util;

import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;


@UtilityClass
public class RedisKeyUtil {
    public final String JWT_BLACKLIST = "jwt_blacklist";
    public final String ASYM_KEYPAIR = "asymmetric:keypair:users";

    public static String getSearchKey(String keyword, List<Long> categoryIds, List<Long> sizeIds, String priceRange, Pageable pageable) {
        Sort.Order order = pageable.getSort().iterator().next();
        categoryIds.sort(Long::compareTo);
        sizeIds.sort(Long::compareTo);

        String categoryIdsString = categoryIds.toString();
        categoryIdsString = categoryIdsString.replaceAll(" ", "");

        String sizeIdsString = sizeIds.toString();
        sizeIdsString = sizeIdsString.replaceAll(" ", "");

        return String.format("search:%s:page:%d:size:%d:sort:%s:direction:%s:categoryIds:%s:sizeIds:%s:priceRange:%s",
                keyword, pageable.getPageNumber(), pageable.getPageSize(), order.getProperty(), order.getDirection().name(), categoryIdsString, sizeIdsString, priceRange);
    }

    public static String getListSizesKey(int pageNumber, int pageSize) {
        return String.format("size:page:%d:size:%d", pageNumber, pageSize);
    }

    public static String getListCategoriesKey(int pageNumber, int pageSize) {
        return String.format("category:page:%d:size:%d", pageNumber, pageSize);
    }

    public static String getCartKey(Long userId) {
        return String.format("cart:%d", userId);
    }

    public static String getOrdersKey(int pageNumber, int pageSize) {
        return String.format("order:page:%d:size:%d", pageNumber, pageSize);
    }

    public static String getOrderKey(Long orderId) {
        return String.format("order:%d", orderId);
    }
    
    public static String getUserOrdersKey(Long userId) {
        return String.format("user:%d:orders", userId);
    }
    
    public static String getUserOrderKey(Long userId, Long orderId) {
        return String.format("user:%d:order:%d", userId, orderId);
    }

    public static String getKeyForProductList(Pageable pageable) {
        String sort = getSortString(pageable.getSort());
        return String.format("product:page:%d:size:%d%s", pageable.getPageNumber(), pageable.getPageSize(), sort);
    }

    public static String getKeyForNewestProducts(Pageable pageable) {
        String sort = getSortString(pageable.getSort());
        return String.format("product:newest:page:%d:size:%d%s", pageable.getPageNumber(), pageable.getPageSize(), sort);
    }

    public static String getKeyForBestSellerProducts(Pageable pageable) {
        return String.format("product:best-sell:page:%d:size:%d", pageable.getPageNumber(), pageable.getPageSize());
    }
    public static String getProductKey(Long productId) {
        return String.format("product:%d", productId);
    }

    private String getSortString(Sort sort) {
        if (sort.isSorted()) {
            Sort.Order order = sort.iterator().next();
            return String.format(":sort:%s:direction:%s", order.getProperty(), order.getDirection().name());
        }
        return "";
    }
}
