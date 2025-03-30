package org.cdwbackend.entity.database;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "sizes")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateAt;

    private Boolean isDeleted;

    public Size(Long id) {
        this.id = id;
    }
}