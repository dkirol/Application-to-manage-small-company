CREATE OR REPLACE PROCEDURE add_task_for_employees (v_name_employee VARCHAR2, v_duration NUMBER, v_comment VARCHAR2)
IS
v_id_employee INTEGER;

BEGIN
    SELECT id_employee
    INTO v_id_employee
    FROM employees
    WHERE CONCAT(first_name, ' ', last_name) = v_name_employee;
    
    INSERT INTO task_for_employees (id_employee, duration, comment) VALUES (v_id_employee, v_duration, v_comment);

END;