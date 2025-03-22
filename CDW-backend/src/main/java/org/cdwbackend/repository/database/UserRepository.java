package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
