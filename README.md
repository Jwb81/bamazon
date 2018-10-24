# bamazon
Amazon-like CLI program to simulate 


# FUNCTIONS

### Customer
- The bamazonCustomer.js file runs a program where the user acts as the customer.  They are able to purchase a product using the product ID.  If the store has enough of that item, it will subtract the quantity that the customer wants from the database and it will show the customer the order total.  It will also add that revenue to the product_sales column in the database.

### Manager
- The bamazonManager.js file runs a program where the user acts as the manager of the store.  They are able to:
    - View the current products for sale
    - View any products that have less than 5 total on hand
    - Add inventory to an item
    - Add a new product to the database


### Supervisor
- The bamazonSupervisor.js file runs a program where the user acts as a supervisor.  They are able to:
    - View the total product sales for each department
    - Add a new department to the database