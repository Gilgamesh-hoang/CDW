package org.cdwbackend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class AddressDTO {
    private Long id;
    private String fullName;
    private String phoneNumber;
    private String province;
    private String district;
    private String commune;
    private String hamlet;
    private Date createAt;
}