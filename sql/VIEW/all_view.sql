--WIDOK ZWRACAJACY PRACOWNIKOW
CREATE VIEW all_employees AS
SELECT *
FROM employees e INNER JOIN contacts c
ON e.id_employee = c.id_employee;

CREATE VIEW ten_employees AS
SELECT *
FROM employees e INNER JOIN contacts c
ON e.id_employee = c.id_employee
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;

--Widok niezaplaconych zamowien
CREATE VIEW unpaid_order AS
SELECT o.id_order, c.first_name, c.last_name, p.product_name, pp.number_of_paid, pp.amount, pp.end_pay_date
FROM orders o INNER JOIN customers c
ON o.id_customer = c.id_customer
INNER JOIN products p
ON o.id_product = p.id_product
INNER JOIN part_paid pp
ON o.id_order = pp.id_order
WHERE pp.confirmed = FALSE AND pp.end_pay_date > (pp.end_pay_date -10);