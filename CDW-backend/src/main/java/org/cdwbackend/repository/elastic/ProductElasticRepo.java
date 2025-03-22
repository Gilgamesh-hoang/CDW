package org.cdwbackend.repository.elastic;


import org.cdwbackend.entity.elastic.ProductDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


public interface ProductElasticRepo extends ElasticsearchRepository<ProductDocument, Long> {
}