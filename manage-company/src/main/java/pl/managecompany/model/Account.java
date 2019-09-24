package pl.managecompany.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "ACCOUNTS")
@Data
public class Account {

    @Id
    @Column
    private int id;

    @Column(length = 60)
    private String login;

    @Column(length = 64)
    private String password;

    @OneToOne
    private Employee employee;

    @OneToOne
    private Customer customer;
}
