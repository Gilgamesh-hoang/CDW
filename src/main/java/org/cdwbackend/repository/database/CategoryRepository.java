package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoriesByCode(String code);
}
