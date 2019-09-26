CREATE OR REPLACE FUNCTION add_delete_change_product(type INTEGER, v_product_name VARCHAR2, v_price NUMBER)
RETURN BOOLEAN
IS
result BOOLEAN;
check_product INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO check_product
    FROM products
    WHERE product_name = v_product_name;
    
    IF type = 1 THEN -- add product
        IF check_product = 0 THEN
            INSERT INTO products(product_name, price) VALUES (v_product_name, v_price);
            result := TRUE;
        ELSE
            result := FALSE;
        END IF;
        
    ELSIF type = 2 THEN -- delete product
        IF check_product = 1 THEN
            DELETE FROM products WHERE product_name = v_product_name;
            result := TRUE;
        ELSE
            result := FALSE;
        END IF;
        
    ELSIF type = 3 THEN -- update product
        IF check_product = 1 THEN
            UPDATE products SET product_name = v_product_name, price = v_price WHERE product_name = v_product_name;
            result := TRUE;
        ELSE
            result := FALSE;
        END IF;
    END IF;
    
RETURN result;
END;