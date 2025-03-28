package org.cdwbackend.dto.request;

import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SearchRequest {
    String keyword;
    List<Long> categoryIds;
    List<Long> sizeIds;
    int page;
    int size;
    String sort;
    String direction;
    String priceRange;

}
