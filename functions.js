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

    updateItem: (con, id, quantity) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE products SET ? WHERE ?';

            // perform the query
            const q = con.query(query, [{
                stock_quantity: quantity
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
    addItem: (con, newObj) => {
        return new Promise((resolve, reject) => {
            let query = "INSERT INTO products SET ?";
            // var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
            con.query(query, newObj, function (err, res) {
                if (err) {
                    return reject(err);
                }
                console.table(res);
                displayItems(con);
                return resolve();
            });
        })
    }
}