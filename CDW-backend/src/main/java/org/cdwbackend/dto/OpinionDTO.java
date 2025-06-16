package org.cdwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OpinionDTO {
    private Long id;
    private String title;
    private String content;
    private Integer rating;
    private Long productId;
    private Long userId;
    private String userName;
    private String userAvatar;
    private Date createAt;
    private Date updateAt;
} 