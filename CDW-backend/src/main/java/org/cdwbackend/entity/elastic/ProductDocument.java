package org.cdwbackend.entity.elastic;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.Setting;


@Data
@Builder
@Document(indexName = "product")
@Setting(settingPath = "/settings-elastic.json")
public class ProductDocument {
    @Id
    private Long id;
    @Field
    private String name;
    @Field
    private Boolean isDeleted;
}
