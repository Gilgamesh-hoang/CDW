package org.cdwbackend.repository.database;

import org.cdwbackend.dto.CategoryDTO;
import org.cdwbackend.entity.database.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoriesByCode(String code);

    @Query(
            """
                SELECT new org.cdwbackend.dto.CategoryDTO(c.id, c.name, c.code, COUNT(c.id))
                FROM Category c LEFT JOIN c.products
                WHERE c.isDeleted = false
                GROUP BY c.id
            """
    )
    List<CategoryDTO> getCategoriesAndCountProducts(Pageable pageable);
}
