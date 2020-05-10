const mysql = require("mysql");

var db = mysql.createConnection({
	host: process.env.HOST || "localhost",
	user: process.env.USER || "root",
	password: process.env.PASSWORD || "",
	database: process.env.DATABASE || "cash_handling",
});
function connectDatabase() {
	return db;
}

module.exports = connectDatabase();
