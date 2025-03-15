package org.cdwbackend.repository.elastic;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.cdwbackend.entity.elastic.ProductDocument;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CustomProductElasticRepo implements ICustomProductElasticRepo {
    ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<ProductDocument> findByKeyword(String keyword) {
        keyword = keyword.toLowerCase();
        String finalKeyword = keyword;

        Query query = NativeQuery.builder()
                .withQuery(q -> q
                        .bool(b -> b
                                .must(m -> m.term(t -> t.field("isDeleted").value(false)))
                                .must(m -> m
                                        .bool(b1 -> b1
                                                .should(s -> s.wildcard(w -> w.field("name").value("*" + finalKeyword + "*")))
                                                .should(s -> s.multiMatch(mul -> mul.query(finalKeyword).fields(List.of("name")).fuzziness("AUTO")))
                                        )
                                )
                        )
                )
                .build();

        return executeSearch(query);
    }


    private List<ProductDocument> executeSearch(Query query) {
        SearchHits<ProductDocument> searchHits = elasticsearchOperations.search(query, ProductDocument.class);
        return searchHits.getSearchHits()
                .stream()
                .map(SearchHit::getContent)
                .toList();
    }
}