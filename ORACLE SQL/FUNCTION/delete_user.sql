--FUNKCJA usuwajaca pracownika
CREATE OR REPLACE FUNCTION delete_user ( c_employee IN OUT INTEGER, v_login IN VARCHAR2)
                                                
RETURN BOOLEAN
IS
result BOOLEAN;
v_id_cust_emplo INTEGER;
BEGIN
IF c_employee IS NOT NULL THEN
    IF c_employee = 0 THEN
        SELECT id_customer
        INTO v_id_cust_emplo
        FROM customers c INNER JOIN accounts a
        ON c.id_customer = a.id_customer
        WHERE a.login = v_login;
        
        DELETE FROM customers WHERE id_customer = v_id_cust_emplo;
        DELETE FROM contacts_customers WHERE id_customer = v_id_cust_emplo;
        DELETE FROM accounts WHERE id_customer = v_id_cust_emplo;
        result := TRUE;
        
    ELSE
        SELECT id_employee
        INTO v_id_cust_emplo
        FROM employees e INNER JOIN accounts a
        ON e.id_employee = a.id_employee
        WHERE a.login = v_login;
        
        DELETE FROM employees WHERE id_employee = v_id_cust_emplo;
        DELETE FROM contacts_employees WHERE id_employee = v_id_cust_emplo;
        DELETE FROM accounts WHERE id_employee = v_id_cust_emplo;
        result := TRUE;
    
    END IF;
ELSE
    result := FALSE;
END IF;

RETURN result;
END;