--FUNKCJA SPRAWDZAJACA KONTO przy logowaniu
CREATE FUNCTION check_account(v_login IN VARCHAR2, v_password IN CHAR)
RETURN BOOLEAN
IS
result BOOLEAN;
v_result INTEGER;

BEGIN
SELECT COUNT(a.id_account)
INTO  v_result
FROM accounts
WHERE login = v_login AND password = v_password;

IF v_result = 1 THEN
result := TRUE;
ELSE
result := FALSE;
END IF;

RETURN result;
END check_account;