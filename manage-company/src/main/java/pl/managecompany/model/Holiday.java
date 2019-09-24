package pl.managecompany.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "HOLIDAY")
@Data
public class Holiday {

    @Id
    @Column
    private int id;

    @Column(name = "number_of_days")
    private int numberDays;

    @Column(name = "type_of_holiday", length = 60)
    private String typeHoliday;

    @Column(name = "start_holiday")
    private LocalDate startHoliday;

    @Column(name = "end_holiday")
    private LocalDate endHoliday;

    @Column
    private boolean confirmed;
}
