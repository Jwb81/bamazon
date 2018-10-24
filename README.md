# bamazon
Amazon-like CLI program to simulate 


# FUNCTIONALITY

### Customer
- The bamazonCustomer.js file runs a program where the user acts as the customer.  They are able to purchase a product using the product ID.  If the store has enough of that item, it will subtract the quantity that the customer wants from the database and it will show the customer the order total.  It will also add that revenue to the product_sales column in the database.

### Manager
- The bamazonManager.js file runs a program where the user acts as the manager of the store.  They are able to:
    - View the current products for sale
        * No other input needed
    - View any products that have less than 5 total on hand
        * No other input needed
    - Add inventory to an item
        * Prompts the user for item_id and quantity to add
    - Add a new product to the database
        * Prompts the user for item_name, department_name, price, and stock_quantity.  Product_sales is automatically set to $0.


### Supervisor
- The bamazonSupervisor.js file runs a program where the user acts as a supervisor.  They are able to:
    - View the total product sales for each department
        * No other input is needed
    - Add a new department to the database
        * Prompts the user for department_name and over_head_costs



##### Additional Info
- The programs have input validation that check for numbers whenever numbers are needed instead of strings.
- 