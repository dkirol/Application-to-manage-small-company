CREATE OR REPLACE TRIGGER change_count_free_day
AFTER UPDATE ON holiday
FOR EACH ROW

DECLARE
first_date DATE := :new.start_holiday;
second_date DATE := :new.end_holiday;
v_count_free_day INTEGER;
v_count_day_holiday INTEGER;

BEGIN
    WHILE first_date <= second_date + 1 LOOP

        IF TO_CHAR(first_date, 'DY')IN ('SO', 'N ') THEN
            NULL;
        ELSE
            v_count_day_holiday := v_count_day_holiday + 1;
        END IF;
        first_date := first_date + 1;
    END LOOP;
    
    SELECT count_free_day
    INTO v_count_free_day
    FROM employment
    WHERE id_employee = :new.id_employee;
    
    v_count_free_day := v_count_free_day - v_count_day_holiday;
    UPDATE employment SET count_free_day = v_count_free_day WHERE id_employee = :new.id_employee;
END;
