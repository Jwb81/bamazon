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
                choices: ['View Product Sales by Department', 'Create New Department']
            }]).then(res => {
                switch (res.command) {
                    case 'View Product Sales by Department':
                        resolve(functions.viewDepartmentSales(connection));
                        break;

                    case 'Create New Department':
                        resolve(functions.createNewDepartment(connection));
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