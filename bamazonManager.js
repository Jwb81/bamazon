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
            .prompt([
                {
                    type: 'list',
                    name: 'command',
                    message: 'Main menu:',
                    choices: ['View Products', 'View Low Inventory', 'Add Inventory', 'Add New Product']
                }
            ]).then(res => {
                console.log(res);
            })

        resolve();
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