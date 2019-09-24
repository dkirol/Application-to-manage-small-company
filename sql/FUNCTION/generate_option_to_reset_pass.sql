--FUNKCJA generująca możliwość resetowania hasla
CREATE FUNCTION rst_pass(v_login IN VARCHAR2, v_mail VARCHAR2)
RETURN BOOLEAN
IS
result BOOLEAN;
count_result INTEGER;
v_id_account INTEGER;
val_rand INTEGER;

BEGIN
SELECT COUNT(*)
INTO count_result
FROM account a INNER JOIN employees e
ON a.id_employee =  e.id_employee
INNER JOIN contacts c
ON e.id_employee = c.id_employee
WHERE a.login = v_login AND c.mail = v_mail;

IF count_result = 1 THEN
    SELECT id_account
    INTO v_id_account
    FROM accounts
    WHERE login = v_login;
    
    val_rand := DBMS_RANDOM.VALUE(100, 10000);
    
    INSERT INTO mail_rst_pass(id_account, generated_code) VALUES (v_id_account, val_random);
    result := TRUE;
ELSE
    result := FALSE;
END IF;

RETURN result;
END rst_pass;