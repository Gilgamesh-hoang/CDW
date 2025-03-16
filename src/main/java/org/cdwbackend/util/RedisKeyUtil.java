package org.cdwbackend.util;

import lombok.experimental.UtilityClass;

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
}
