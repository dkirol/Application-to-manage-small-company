CREATE OR REPLACE PROCEDURE add_product_in_promotion (v_product_name IN VARCHAR2, v_percent_of_promotion IN NUMBER, v_start_promotion TIMESTAMP, v_days_promotion INTEGER)
IS
v_id_product INTEGER;
v_actually_price NUMBER(10,2);
v_new_price NUMBER(10,2);

BEGIN
    SELECT id_product, price
    INTO v_id_product, v_actually_price
    FROM products
    WHERE product_name = v_product_name;
    
    v_new_price := v_actually_price * v_percent_of_promotion;
    
    INSERT INTO products_in_promotion(id_product, new_price, start_promotion, days_promotion)
    VALUES(v_id_product, v_new_price, v_start_promotion, v_days_promotion);
    result := TRUE;
END;