package org.cdwbackend.entity.database;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "import_orders")
public class ImportOrder {
    @Id
    private String id;

    private String supplier;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    private Boolean isDeleted = false;
}