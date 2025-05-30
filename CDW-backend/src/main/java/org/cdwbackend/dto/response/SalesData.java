package org.cdwbackend.dto.response;

import lombok.Data;

@Data
public class SalesData {
    private String date;
    private int revenue;
    private int orders;
} 