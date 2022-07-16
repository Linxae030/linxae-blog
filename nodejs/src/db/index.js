const mysql = require("mysql");
const db = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "gaoge123456",
	database: "blog",
});
module.exports = db;
