const mysql = require("mysql");

var db = mysql.createConnection({
	host: process.env.host || "localhost",
	user: process.env.user || "root",
	password: process.env.password || "",
	database: process.env.DATABASE || "cash_handling",
});
function connectDatabase() {
	return db;
}

module.exports = connectDatabase();
