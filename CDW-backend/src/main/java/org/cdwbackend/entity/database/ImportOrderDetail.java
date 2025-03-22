package org.cdwbackend.entity.database;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "import_order_details")
public class ImportOrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "importOrderId")
    private ImportOrder importOrder;

    @ManyToOne
    @JoinColumn(name = "productSizeId")
    private ProductSize productSize;

    private Integer quantityImport;

    @Column
    private Double priceImport;

    private Boolean isDeleted = false;
}