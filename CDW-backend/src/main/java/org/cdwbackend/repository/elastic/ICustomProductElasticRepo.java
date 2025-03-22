package org.cdwbackend.repository.elastic;

import org.cdwbackend.entity.elastic.ProductDocument;

import java.util.List;

public interface ICustomProductElasticRepo {
    List<ProductDocument> findByKeyword(String keyword);

}
