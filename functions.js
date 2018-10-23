module.exports = {
    vars: {
        mysqlCon: {
            host: "localhost",

            // Your port; if not 3306
            port: 3306,

            // Your username
            user: "root",

            // Your password
            password: "root",
            database: "bamazon"
        }
    },

    updateItem: (con, id, quantity, sales) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE products SET ? WHERE ?';

            // perform the query
            const q = con.query(query, [{
                stock_quantity: quantity,
                product_sales: sales
            }, {
                item_id: id
            }], (err, res) => {
                if (err) {
                    return reject(err);
                }
                // console.log(`q: ${q.sql}`);
                return resolve();
            })
        })
    },

    // display all products in the store
    displayItems: (con) => {
        return new Promise((resolve, reject) => {
            var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
            con.query(query, function (err, res) {
                if (err) {
                    return reject(err);
                }
                console.table(res);
                return resolve();
            });
        })
    },

    // display low inventory
    lowInventory: (con) => {
        return new Promise((resolve, reject) => {
            var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5";
            con.query(query, function (err, res) {
                if (err) {
                    return reject(err);
                }
                console.log('LOW INVENTORY:');
                console.table(res);
                return resolve();
            });
        })
    },

    // add new product to the database
    addToItem: (con, inquirer) => {
        return new Promise((resolve, reject) => {
            // prompt the user for the id and amount of the item
            inquirer.prompt([{
                    type: 'input',
                    name: 'id',
                    message: 'Please type the ID of the product that you want to add: ',
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
                    message: 'How many of that product do you want to add? ',
                    validate: (input) => {
                        if (isNaN(input)) {
                            return false;
                        }
                        return true;
                    }
                }
            ]).then((response) => {
                let stock_quantity;

                // get the current stock quantity
                let q = {
                    item_id: response.id
                };
                con.query(`SELECT stock_quantity FROM products where ?`, q, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!res.length) {
                        return reject('That is not a valid ITEM ID')
                    }

                    let updateSet = {
                        stock_quantity: Number(res[0].stock_quantity) + Number(response.quantity)
                    }
                    let updateWhere = {
                        item_id: response.id
                    }

                    const query = `UPDATE products SET ? WHERE ?`
                    // let query = "INSERT INTO products SET ?";
                    // var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
                    con.query(query, [updateSet, updateWhere], function (err, res) {
                        console.log(q.sql);
                        if (err) {
                            return reject(err);
                        }
                        // console.table(res);
                        module.exports.displayItems(con);
                        return resolve();
                    });
                })


            });
        })
    },

    addNewItem: (con, inquirer) => {
        return new Promise((resolve, reject) => {

            inquirer.prompt([{
                    type: 'input',
                    name: 'name',
                    message: 'Product name: '
                },
                {
                    type: 'input',
                    name: 'department',
                    message: 'Department: '
                },
                {
                    type: 'input',
                    name: 'price',
                    message: 'Price: '
                },
                {
                    type: 'input',
                    name: 'quantity',
                    message: 'Current quantity: ',
                    default: 0
                }
            ]).then(response => {
                let newObj = {
                    product_name: response.name,
                    department_name: response.department,
                    price: response.price,
                    stock_quantity: response.quantity
                }

                con.query(`INSERT INTO products SET ?`, newObj, (err, res) => {
                    if (err) {
                        return reject(console.log(err));
                    }

                    return resolve(module.exports.displayItems(con));
                })
            })
        })

    },

    viewDepartmentSales: (con) => {
        let query = `
        SELECT d.department_id, d.department_name, d.over_head_costs, p.product_sales, (p.product_sales - d.over_head_costs) as total_profit
        from departments d
        LEFT JOIN (
        SELECT department_name, product_sales 
        FROM products 
        GROUP BY department_name
        ) as p
        ON d.department_name = p.department_name
         `

        con.query(query, (err, result) => {
            if (err) {
                return console.log(err);
            }

            console.table(result);
        })
    },

    createNewDepartment: (con, inquirer) => {
        return new Promise((resolve, reject) => {
            // prompt the user for the id and amount of the item
            inquirer.prompt([{
                    type: 'input',
                    name: 'id',
                    message: 'Please type the ID of the product that you want to add: ',
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
                    message: 'How many of that product do you want to add? ',
                    validate: (input) => {
                        if (isNaN(input)) {
                            return false;
                        }
                        return true;
                    }
                }
            ]).then((response) => {
                let stock_quantity;

                // get the current stock quantity
                let q = {
                    item_id: response.id
                };
                con.query(`SELECT stock_quantity FROM products where ?`, q, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!res.length) {
                        return reject('That is not a valid ITEM ID')
                    }

                    let updateSet = {
                        stock_quantity: Number(res[0].stock_quantity) + Number(response.quantity)
                    }
                    let updateWhere = {
                        item_id: response.id
                    }

                    const query = `UPDATE products SET ? WHERE ?`
                    // let query = "INSERT INTO products SET ?";
                    // var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
                    con.query(query, [updateSet, updateWhere], function (err, res) {
                        console.log(q.sql);
                        if (err) {
                            return reject(err);
                        }
                        // console.table(res);
                        module.exports.displayItems(con);
                        return resolve();
                    });
                })


            });
        })
    }
}