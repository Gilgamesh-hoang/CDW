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
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 350)
    private String name;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "thumbnail", length = 3000)
    private String thumbnail;

    @Column(name = "shortDescription", length = 500)
    private String shortDescription;

    @Column(name = "modelUrl")
    private String modelUrl;

    @Column(name = "slug")
    private String slug;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

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

    @Column(name = "totalViewAndSearch")
    private Integer totalViewAndSearch = 0;
}