--TRIGGER który tworzy raty dla danego zakupu(w przypadku wziecia rat)

CREATE OR REPLACE TRIGGER part_orders
AFTER INSERT OR UPDATE
ON orders
FOR EACH ROW

DECLARE

v_type_pay orders.type_pay%TYPE := :new.type_pay; -- typ patnoœci
v_count_part_pay orders.count_part_pay%TYPE := :new.count_part_pay; -- liczba rat wybranych
v_id_order orders.id_order%TYPE := :new.id_order; -- numer zamówienia
v_id_product orders.id_product%TYPE := :new.id_product; -- numer produktu
v_end_pay_date DATE := CURRENT_DATE; -- finalny dzien platnosci
v_amount NUMBER(6,2); -- kwota raty
v_price products.price%TYPE; -- kwota produktu

BEGIN


SELECT price
INTO v_price
FROM products
WHERE id_product = v_id_product;

IF v_type_pay = 'part' THEN
v_amount := (v_price * 1.2) / v_count_part_pay;

FOR i IN 1..v_count_part_pay
LOOP

INSERT INTO part_paid(id_order, number_of_pay, amount, end_pay_date)
VALUES (v_id_order, i, v_amount, ROUND(ADD_MONTHS(v_end_pay_date, i), 'MM') + 10);
END LOOP;

ELSIF v_type_pay = 'full' THEN

v_amount := v_price;
INSERT INTO part_paid(id_order, number_of_pay, amount, end_pay_date)
VALUES (v_id_order, 1, v_amount, ROUND(ADD_MONTHS(v_end_pay_date, 1), 'MM') + 10);
END IF;

END;