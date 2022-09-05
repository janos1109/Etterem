const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'dolcevita'
});
const port = 3000;

app.route("/menu")
    .get(function (req, res) {
        const q = "SELECT * FROM menu_item";
        pool.query(q, function (error, results) {
            if (!error) {
                res.send(results);
            } else {
                res.send(error);
            }
        });
    });

app.route("/menu/:id")
    .get(function (req, res) {
        const q = "SELECT * FROM menu_item WHERE id = ?";
        pool.query(q, [req.params.id], function (error, result) {
            if (!error) {
                res.send(result);
            } else {
                res.send(error);
            }
        });
    });
   
app.route("/order")
    .post(function (req, res) {
        const q = 'INSERT INTO orders (name, address, city, postcode, country, mobile, email, createdAt, total, messageFromUser)' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        pool.query(q, [req.body.name, req.body.address, req.body.city, req.body.postcode, req.body.country,
            req.body.mobile, req.body.email, req.body.createdAt, req.body.total, req.body.messageFromUser],
            function (error, result) {
                if (!error) {
                    res.send(result);
                } else {
                    res.send(error);
                }
            });
            
        });

app.route("/orderitems")
    .post(function (req, res) {
        const q = 'INSERT INTO order_item (orderId, itemId, quantity) VALUES (?, ?, ?);'
        let orderedItems = req.body.orderedItems;
        orderedItems.forEach(o => {
            pool.query(q, [req.body.orderId, o.id, o.quantity], 
                function(error, result) {
                    if (!error) {
                        res.send(result);
                    } else {
                        res.send(error);
                    }
                });
        });
    });

app.listen(port, () => {
    console.log(`Szerver elindítva a ${port}-es porton...`);
});