package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByCode(String userRole);
}