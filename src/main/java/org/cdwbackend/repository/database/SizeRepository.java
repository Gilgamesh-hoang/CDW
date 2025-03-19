package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Size, Long> {
    Size findByName(String name);
}
