package pl.managecompany.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "CUSTOMERS")
@Data
public class Customer {

    @Id
    @Column
    private int id;

    @Column(name = "first_name", length = 40)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(length = 11)
    private int pesel;

    @OneToOne
    private Account account;
}
