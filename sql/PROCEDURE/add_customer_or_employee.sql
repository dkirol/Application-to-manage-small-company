--PROCEDURA dodajaca pracownika/klienta
CREATE OR REPLACE PROCEDURE insert_employees (  c_employee OUT INTEGER,
                                                --employees/customers column
                                                first_name IN VARCHAR2,
                                                last_name IN VARCHAR2,
                                                v_pesel IN NUMBER,
                                                v_password IN VARCHAR2,
                                                
                                                --employees column
                                                department OUT VARCHAR2,
                                                id_manager OUT INTEGER,
                                                
                                                --employees/customers column
                                                city IN VARCHAR2,
                                                street IN VARCHAR,
                                                num IN CHAR,
                                                phone IN NUMBER,
                                                mail IN VARCHAR)
IS
v_id_emplo_custo INTEGER;
count_accounts INTEGER;
v_login VARCHAR2(60);
first_char_name VARCHAR2(1);

BEGIN

SELECT COUNT(*)
INTO count_accounts
FROM accounts
WHERE last_name = UPPER(last_name);

IF count_accounts = 0 THEN
    v_login := UPPER(last_name);
ELSE
    first_char_name := SUBSTR(first_name, 1, 1);
    v_login := CONCAT(UPPER(first_char_name),UPPER(last_name));
END IF;

IF c_employee = 0 THEN
    
    INSERT INTO customers (first_name, last_name, pesel) VALUES (first_name, last_name, v_pesel);
    BEGIN
        SELECT id_customer
        INTO v_id_emplo_custo
        FROM customers
        WHERE pesel = v_pesel;
        
        INSERT INTO contacts_customer (id_customer, city, street, num, phone, mail) VALUES (v_id_emplo_custo, city, street, num, phone, mail);
    END;
    INSERT INTO accounts(login, password, id_customer) VALUES (v_login, v_password, v_id_emplo_custo);

ELSE
    
    INSERT INTO employees(first_name, last_name, pesel, department, id_manager) VALUES (first_name, last_name, v_pesel, department, id_manager);
    BEGIN
        SELECT id_employee
        INTO v_id_emplo_custo
        FROM employees
        WHERE pesel = v_pesel;
        
        INSERT INTO contacts_customers (id_employee, city, street, num, phone, mail) VALUES (v_id_emplo_custo, city, street, num, phone, mail);
    END;
    INSERT INTO accounts(login, password, id_employee) VALUES (v_login, v_password, v_id_emplo_custo);
END IF;

END;