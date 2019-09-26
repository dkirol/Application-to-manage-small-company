CREATE OR REPLACE PROCEDURE add_delete_order (v_type IN INTEGER, v_id_order INTEGER, v_customer_name IN OUT VARCHAR2, v_product_name IN OUT VARCHAR2, v_type_pay IN OUT CHAR, count_part_pay IN OUT NUMBER )
IS
v_id_customer INTEGER;
v_id_product INTEGER;
BEGIN
    IF v_type = 1 THEN --add order
        SELECT id_customer
        INTO v_id_customer
        FROM customers
        WHERE CONCAT(first_name, ' ', last_name) = v_customer_name;
        
        SELECT id_product
        INTO v_id_product
        FROM products
        WHERE product_name = v_product_name;
        
        INSERT INTO orders (id_customer, id_product, type_pay, count_part_pay) VALUES (v_id_customer, v_id_product, v_type_pay, v_count_part_pay); 
    ELSIF v_type = 2 THEN -- delete order
        DELETE FROM orders WHERE id_order = v_id_order;
        
    ELSE
        NULL;
    END IF;
END;