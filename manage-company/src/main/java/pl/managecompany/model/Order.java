package pl.managecompany.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Orders")
@Data
public class Order {

    @Id
    @Column
    private int id;

    @Column(name = "type_pay", length = 4)
    private String typePay;

    @Column(name = "count_part_pay", length = 3)
    private int countPartPay;

    @Column(name = "order_date")
    private LocalDate orderDate;

    @OneToOne
    private Customer customer;

    @OneToMany(mappedBy = "order", orphanRemoval = true)
    private Set<Product> products;
}
