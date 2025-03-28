package org.cdwbackend.repository.database;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.apache.commons.lang3.StringUtils;
import org.cdwbackend.entity.database.Product;
import org.cdwbackend.entity.database.ProductSize;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    public Page<Product> findAllByCategoryAndSize(List<Long> productIds, List<Long> categoryIds,
                                                  List<Long> sizeIds, String priceRange, Pageable pageable) {
        // Get the sort order and direction from the pageable object
        Sort.Order order = pageable.getSort().iterator().next();
        String sortProperty = order.getProperty();
        String sortDirection = order.getDirection().name().toLowerCase();

        // Create a CriteriaBuilder for building the query
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        // Main query to retrieve products
        CriteriaQuery<Product> query = cb.createQuery(Product.class);
        Root<Product> productRoot = query.from(Product.class);
        Join<Product, ProductSize> productSizesJoin = productRoot.join("productSizes");
        List<Predicate> predicates = buildPredicates(cb, query, productRoot, productSizesJoin,
                productIds, categoryIds, sizeIds, priceRange);

        // Set the selection, predicates, and order for the query
        query.select(productRoot)
                .distinct(true)
                .where(predicates.toArray(new Predicate[0]))
                .orderBy(buildOrder(cb, query, productRoot, sortProperty, sortDirection));

        // Execute the query and get the results
        List<Product> results = entityManager.createQuery(query)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // Count query to get the total number of products
        Long total = countProducts(cb, productRoot.get("id"), productIds, categoryIds, sizeIds, priceRange);

        // Return the results as a Page object
        return new PageImpl<>(results, pageable, total);
    }

    private List<Predicate> buildPredicates(CriteriaBuilder cb, CriteriaQuery<?> query, Root<Product> root,
                                            Join<Product, ProductSize> sizesJoin, List<Long> productIds,
                                            List<Long> categoryIds, List<Long> sizeIds, String priceRange) {
        List<Predicate> predicates = new ArrayList<>();

        // Add predicate for category IDs
        if (categoryIds != null && !categoryIds.isEmpty()) {
            predicates.add(root.get("category").get("id").in(categoryIds));
        }
        // Add predicate for size IDs
        if (sizeIds != null && !sizeIds.isEmpty()) {
            predicates.add(sizesJoin.get("size").get("id").in(sizeIds));
        }
        // Add predicate for product IDs
        if (productIds != null && !productIds.isEmpty()) {
            predicates.add(root.get("id").in(productIds));
        }
        // Add predicate for price range
        if (!StringUtils.isBlank(priceRange)) {
            addPriceRangePredicate(cb, query, root, predicates, priceRange);
        }

        return predicates;
    }

    private void addPriceRangePredicate(CriteriaBuilder cb, CriteriaQuery<?> query, Root<Product> root,
                                        List<Predicate> predicates, String priceRange) {
        try {
            // Parse the price range
            String[] range = priceRange.split("-");
            Double minPrice = Double.parseDouble(range[0]);
            Double maxPrice = range.length > 1 ? Double.parseDouble(range[1]) : null;

            // Create a subquery to get the minimum price
            Subquery<Double> priceSubquery = createPriceSubquery(cb, query, root);
            if (maxPrice != null) {
                // Add predicate for price between min and max
                predicates.add(cb.between(priceSubquery, minPrice, maxPrice));
            } else {
                // Add predicate for price greater than or equal to min
                predicates.add(cb.ge(priceSubquery, minPrice));
            }
        } catch (NumberFormatException e) {
            // Ignore invalid price range or log error if needed
        }
    }

    private Subquery<Double> createPriceSubquery(CriteriaBuilder cb, CriteriaQuery<?> query, Root<Product> root) {
        // Create a subquery to get the minimum price of the product sizes
        Subquery<Double> subquery = query.subquery(Double.class);
        Root<Product> subRoot = subquery.from(Product.class);
        Join<Product, ProductSize> subSizesJoin = subRoot.join("productSizes");
        Expression<Double> priceExpression = subSizesJoin.get("price").as(Double.class);
        return subquery.select(cb.least(priceExpression))
                .where(cb.equal(subRoot.get("id"), root.get("id")));
    }

    private Order buildOrder(CriteriaBuilder cb, CriteriaQuery<Product> query, Root<Product> root,
                             String sortProperty, String sortDirection) {
        if ("price".equals(sortProperty)) {
            // Create a subquery to get the minimum price for sorting
            Subquery<Double> minPriceSubquery = createPriceSubquery(cb, query, root);
            return "asc".equals(sortDirection) ? cb.asc(minPriceSubquery) : cb.desc(minPriceSubquery);
        } else if ("newest".equals(sortProperty)) {
            // Sort by creation date
            return "asc".equals(sortDirection) ? cb.asc(root.get("createAt")) : cb.desc(root.get("createAt"));
        }
        return null; // Default to no sorting if sortProperty is invalid
    }

    private Long countProducts(CriteriaBuilder cb, Path<Long> productIdPath, List<Long> productIds,
                               List<Long> categoryIds, List<Long> sizeIds, String priceRange) {
        // Create a count query to get the total number of products
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<Product> countRoot = countQuery.from(Product.class);
        Join<Product, ProductSize> countSizesJoin = null;

        // Join product sizes if needed
        if ((sizeIds != null && !sizeIds.isEmpty()) || !StringUtils.isBlank(priceRange)) {
            countSizesJoin = countRoot.join("productSizes");
        }

        // Build predicates for the count query
        List<Predicate> countPredicates = buildPredicates(cb, countQuery, countRoot, countSizesJoin,
                productIds, categoryIds, sizeIds, priceRange);
        countQuery.select(cb.countDistinct(countRoot))
                .where(countPredicates.toArray(new Predicate[0]));

        // Execute the count query and return the result
        return entityManager.createQuery(countQuery).getSingleResult();
    }
}
