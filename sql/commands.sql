DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(15),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
);

USE bamazon;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Apple Watch Series 4 Space Gray 44mm', 'Computers', 499.00, 7);


USE bamazon;
UPDATE products SET stock_quantity = 7
WHERE item_id =  1;

USE bamazon;
select * from products;
