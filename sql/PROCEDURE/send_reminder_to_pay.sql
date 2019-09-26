
CREATE OR REPLACE PROCEDURE send_notification_to_pay
AS
CURSOR cursor_1 IS
    SELECT pp.id_part_pay, pp.id_order, pp.number_of_pay, pp.amount, pp.end_pay_date, o.id_customer, c.first_name, c.last_name, cc.email
    FROM part_pay pp LEFT JOIN orders o
    ON pp.id_order = o.id_order
    LEFT JOIN customers c
    ON o.id_customer = c.id_customer
    LEFT JOIN contact_customers cc
    ON c.id_customer = cc.id_customer
    WHERE end_pay_date < CURRENT_DATE AND confirmed = FALSE;
    
BEGIN

FOR i IN cursor_1
LOOP
    v_notification := ('Tresæ maila :)' || i.first_name, i.last_name, i.id_order, i.amount, i.end_pay_date || 'reszta maila, do wypelnienia') ;  
    
    INSERT INTO late_payment(notifiaction, id_part_pay, id_order, id_customer, sendto, number_of_paid)
    VALUES (v_notification, i.id_part_pay, i.id_order, i.id_customer, i.email, i.number_of_paid); 
END LOOP;

END;