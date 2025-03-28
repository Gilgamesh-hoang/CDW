package org.cdwbackend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {
    int totalPage;
    int currentPage;
    T data;

}
