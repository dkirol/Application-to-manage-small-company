package pl.managecompany.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "EMPLOYEES")
@Data
public class Employee {

    @Id
    @Column
    private int id;

    @Column(name = "first_name", length = 40)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(length = 11)
    private int pesel;

    @Column(length = 60)
    private String department;
}
