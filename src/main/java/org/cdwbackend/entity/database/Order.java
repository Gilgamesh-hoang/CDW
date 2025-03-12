package org.cdwbackend.entity.database;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "note", length = 1000)
    private String note = "";

    @Column(name = "totalAmount")
    private Double totalAmount ;

    @ManyToOne
    @JoinColumn(name = "addressId")
    private Address address;

    @Column(name = "isPaid")
    private Boolean isPaid = false;

    @Column(name = "slug", unique = true)
    private String slug;

    @Column(name = "createAt")
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createAt;

    @Column(name = "updateAt")
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updateAt;

    @Column(name = "isDeleted")
    private Boolean isDeleted = false;
}