const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("./cors");
const myError = require("./error");
const db = require("./db");

const saveRecord = require("./api/routes/saveRecord");
const getRecord = require("./api/routes/getRecord");
app.listen(process.env.PORT || 5000, () => {
	console.log("server running on port 5000");
});
db.connect((err) => {
	if (err) console.log(err.message);
	else {
		console.log("connected to database");
	}
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors);

app.use("/saveRecord", saveRecord);
app.use("/getRecord", getRecord);

app.use(myError.createError);
app.use(myError.throwError);

module.exports = app;
