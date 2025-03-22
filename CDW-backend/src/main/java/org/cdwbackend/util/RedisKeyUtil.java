package org.cdwbackend.util;

import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Pageable;

import java.util.List;


@UtilityClass
public class RedisKeyUtil {
    public final String JWT_BLACKLIST = "jwt_blacklist";
    public final String HOMEPAGE_PRODUCTS = "homepage";
    public final String ASYM_KEYPAIR = "asymmetric:keypair:users";

    public static String getSearchKey(String keyword, int pageNumber, int pageSize, String string, String direction, List<Long> categoryIds, List<Long> sizeIds) {
        categoryIds.sort(Long::compareTo);
        sizeIds.sort(Long::compareTo);

        String categoryIdsString = categoryIds.toString();
        categoryIdsString = categoryIdsString.replaceAll(" ", "");

        String sizeIdsString = sizeIds.toString();
        sizeIdsString = sizeIdsString.replaceAll(" ", "");

        return String.format("search:%s:page:%d:size:%d:sort:%s:direction:%s:categoryIds:%s:sizeIds:%s",
                keyword, pageNumber, pageSize, string, direction, categoryIdsString, sizeIdsString);
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

    public static String getKeyForProductList(Pageable pageable) {
        return String.format("product:page:%d:size:%d", pageable.getPageNumber(), pageable.getPageSize());
    }
}
