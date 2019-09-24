package pl.managecompany.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Products")
@Data
public class Product {

    @Id
    @Column
    private int id;

    @Column(name = "product_name")
    private String productName;

    @Column
    private int price;

    @ManyToOne
    private Order order;
}
