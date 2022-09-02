const express = require('express');
const app = express();
app.use(express.json());
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost:3306',
    user: 'root',
    password: '',
    database: 'dolceVita'
});
const port = 3000;

app.listen(port, () => {
    console.log(`Szerver elindítva a ${port}-es porton...`);
});