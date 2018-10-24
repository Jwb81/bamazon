// bring in the required packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const functions = require('./functions');


// create the connection to the MySQL database
var connection = mysql.createConnection(functions.vars.mysqlCon);



// prompt the manager for input
const promptUser = () => {
    return new Promise((resolve, reject) => {
        inquirer
            .prompt([{
                type: 'list',
                name: 'command',
                message: 'Main menu:',
                choices: ['View Products', 'View Low Inventory', 'Add Inventory', 'Add New Product']
            }]).then(res => {
                switch (res.command) {
                    case 'View Products':
                        resolve(functions.displayItems(connection));
                        break;
                    case 'View Low Inventory':
                        resolve(functions.lowInventory(connection));
                        break;
                    case 'Add Inventory':
                        resolve(
                            functions.addToItem(connection, inquirer)
                            .catch(console.log)
                        )
                        break;
                    case 'Add New Product':
                        resolve(functions.addNewItem(connection, inquirer));
                        break;
                    default:
                        break;
                }

            })

    })
}


// actually connect to the database
connection.connect(function (err) {
    if (err) throw err;

    promptUser()
        .then(() => {
            connection.end();
        })
});