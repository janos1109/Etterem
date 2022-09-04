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

app.listen(port, () => {
    console.log(`Szerver elindítva a ${port}-es porton...`);
});