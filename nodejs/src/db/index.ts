import mysql from 'mysql';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "gaoge123456",
    database: "blog",
})