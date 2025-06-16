package org.cdwbackend.repository.database;

import org.cdwbackend.entity.database.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
