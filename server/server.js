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
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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
                    'mobile, email, createdAt, total, messageFromUser, visszavont)' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
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
                req.body.messageFromUser,
                false],
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

// Bejelentkezés
app.post('/admin/login', (req, res) => {
    const admin = process.env.ADMIN;
    const hash = process.env.HASH;
    if (req.body.username != admin)
        return res.status(401).send({ message: "Hibás felhasználónév!"});
    if (!bcrypt.compareSync(req.body.password, hash))
        return res.status(401).send({ message: 'Hibás jelszó!' });
    const token = jwt.sign(
        { password: req.body.password },
        process.env.TOKEN_SECRET,
        { expiresIn: 3600 });
    res.json({ token: token, message: 'Sikeres bejelentkezés.'});
})

// Token ellenőrzése
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).send({ message: 'Azonosítás szükséges!' });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send({ message: 'Nincs jogosultsága!' });
        req.user = user;
        next();
    })
}

app.listen(port, () => {
    console.log(`Szerver elindítva a ${port}-es porton...`);
});