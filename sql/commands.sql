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




-- commands used in workbench
update products
set stock_quantity = 5
where item_id > 0;

select * from products;

delete from products 
where department_name = 'test';

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Lenovo Yoga 13', 'Computers', 1299, 5),
('LG OLED 65C8', 'Home Theater', 2499, 2),
('Sony 65X900', 'Home Theater', 1999, 3),
('Samsung 65NU8000', 'Home Theater', 1699, 6),
('Samsung Smart Fridge', 'Appliances', 3499, 0),
('LG Washer', 'Appliances', 449, 1),
('LG Dryer', 'Appliances', 399, 1),
('5ft Lightning cable', 'Cables', 19.99, 21),
('5ft Micro USB cable', 'Cables', 14.99, 40);



delete from products 
where item_id > 1;

select * from departments;

create table departments (
	department_id int not null auto_increment,
    department_name varchar(30),
    over_head_costs decimal(10,2),
    primary key (department_id)
);

insert into departments (department_name, over_head_costs)
values 
('Computers', '200'),
('Home Theater', '150'),
('Appliances', '400');

ALTER TABLE products
ADD product_sales decimal(10,2) DEFAULT 0;

ALTER TABLE products
MODIFY COLUMN product_sales DECIMAL(10,2) DEFAULT 0;




SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales, (p.product_sales - d.over_head_costs) as total_profit
from departments d
LEFT JOIN (
select department_name, SUM(product_sales) as product_sales
from products
group by department_name
order by department_name
) as p
ON d.department_name = p.department_name

