-- FUNKCJA który resetuje haslo
CREATE OR REPLACE FUNCTION reset_password(v_generated_code IN INTEGER, v_login IN VARCHAR2, v_new_password IN VARCHAR2)
RETURN BOOLEAN
IS
result BOOLEAN;
count_result INTEGER;
BEGIN
SELECT COUNT (*)
INTO count_result
FROM accounts a INNER JOIN mail_rst_pass
ON a.id_account = mrp.id_account
WHERE a.login = v_login AND generated_code = v_generated_code;

IF count_result = 1 THEN
    UPDATE accounts SET password = v_new_password WHERE login = v_login;
    UPDATE mail_rst_pass SET succesfull = 1, generated_code = NULL
    WHERE generated_code = v_generated_code AND id_account = (SELECT id_account FROM accounts WHERE login = v_login);
    result := TRUE;
ELSE
result := FALSE;
END IF;
END;