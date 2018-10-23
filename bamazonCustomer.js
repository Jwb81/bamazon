// bring in the required packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const functions = require('./functions');


// create the connection to the MySQL database
var connection = mysql.createConnection(functions.vars.mysqlCon);




// prompt the user for input
const promptUser = () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([{
                type: 'input',
                name: 'id',
                message: 'Please type the ID of the product that you want to buy: ',
                validate: (input) => {
                    if (isNaN(input)) {
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many of that product do you want to purchase? ',
                validate: (input) => {
                    if (isNaN(input)) {
                        return false;
                    }
                    return true;
                }
            }
        ]).then((response) => {
            const query = 'SELECT * from products WHERE ?';
            const idObj = {
                item_id: response.id
            };

            let sql = mysql.format(query, idObj);

            connection.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                }

                // check if that item exists
                if (!res.length) {
                    console.log('Sorry, but that is not an item...');
                    return resolve(functions.displayItems(connection));
                }

                // grab the first object to save typing
                res = res[0];

                // check if there is any inventory for that item
                if (res.stock_quantity == 0) {
                    console.log('Sorry, that item is OUT OF STOCK');
                    return resolve(functions.displayItems(connection));
                }

                // check if there is enough quantity for the user
                if (response.quantity > res.stock_quantity) {
                    console.log('Sorry, but there is an insufficient quantity of that product...');
                    return resolve(functions.displayItems(connection));
                }

                // if there is enough quantity and the item exists, update it
                console.log(`Your order has been processed. The total bill is: ${response.quantity * res.price}`);

                const sales = (res.product_sales ? res.product_sales : 0) + (response.quantity * res.price); 
                console.log(`Sales: ${sales}`);
                functions.updateItem(connection, response.id, (res.stock_quantity - response.quantity), sales)
                    .then(resolve(functions.displayItems(connection)))
            })
        })
    })
}

// actually connect to the database
connection.connect(function (err) {
    if (err) throw err;
    functions.displayItems(connection)
        .then(() => {
            promptUser()
                .then(() => {
                    connection.end();
                })
        })
        .catch((err) => {
            console.log(err);
        })
    // promptUser();
    // connection.end();
});