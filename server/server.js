const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'dolcevita'
});
const port = 3000;

app.get('/menu', (req, res) => {
        const q = "SELECT * FROM menu_item";
        pool.query(q, function (error, results) {
            if (!error) res.send(results);
            else res.send(error);
        });
    });

app.get('/menu/:id', (req, res) => {
        const q = "SELECT * FROM menu_item WHERE id = ?";
        pool.query(q, [req.params.id], 
            function (error, result) {
                if (!error) res.send(result);
                else res.send(error);
        });
    });

app.post('/order', (req, res) => {
        const q = 'INSERT INTO orders (name, address, city, postcode, country, ' +
                    'mobile, email, createdAt, total, messageFromUser)' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        pool.query(q, 
                [req.body.name, 
                req.body.address, 
                req.body.city, 
                req.body.postcode, 
                req.body.country, 
                req.body.mobile, 
                req.body.email, 
                req.body.createdAt, 
                req.body.total, 
                req.body.messageFromUser],
            function (error, result) {
                if (!error) res.send(result);
                else res.send(error);
            });
            
        });

app.post('/orderitems', (req, res) => {
        const q = 'INSERT INTO order_item (orderId, itemId, quantity) ' +
                    'VALUES (?, ?, ?);'
        pool.query(q, 
                [req.body.orderId, 
                req.body.orderItems.id, 
                req.body.orderItems.quantity],
            function(error, result) {
                if (!error) res.send(result);
                else res.send(error);
            });
    });

app.listen(port, () => {
    console.log(`Szerver elindítva a ${port}-es porton...`);
});