package org.cdwbackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SalesData {
    private String date;
    private int revenue;
    private int orders;
} 