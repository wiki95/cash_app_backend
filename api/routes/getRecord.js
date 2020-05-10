const express = require("express");
const db = require("../../db");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/:day/:id", (req, result, next) => {
	let { day, id } = req.params;
	let selectAllNoBill = "";
	let selectWithBills = "";

	if (day === "All" && id === "Empty") {
		selectAllNoBill =
			"SELECT give_take.ID, give_take.USER_ID, give_take.TOTAL_BILL, give_take.TOTAL_TAKEN, give_take.TOTAL_GIVEN, give_take.MODE, give_take.DATE_TIME, amount_taken_denom.T_FT, amount_taken_denom.T_OT, amount_taken_denom.T_FH, amount_taken_denom.T_OH, amount_taken_denom.T_FIF, amount_taken_denom.T_TWE, amount_taken_denom.T_TEN, amount_taken_denom.T_FIV, amount_taken_denom.T_TWO, amount_taken_denom.T_ONE, amount_given_denom.G_FT, amount_given_denom.G_OT, amount_given_denom.G_FH, amount_given_denom.G_OH, amount_given_denom.G_FIF, amount_given_denom.G_TWE, amount_given_denom.G_TEN, amount_given_denom.G_FIV, amount_given_denom.G_TWO, amount_given_denom.G_ONE FROM give_take INNER join amount_taken_denom ON give_take.ID = amount_taken_denom.GT_ID INNER JOIN amount_given_denom ON give_take.ID = amount_given_denom.GT_ID;";
		selectWithBills =
			"SELECT give_take.ID, bills.BILL_ITEM from give_take INNER JOIN bills on bills.GT_ID = give_take.ID;";
	}
	if (day !== "All" && id === "Empty") {
		selectAllNoBill =
			"SELECT give_take.ID, give_take.USER_ID, give_take.TOTAL_BILL, give_take.TOTAL_TAKEN, give_take.TOTAL_GIVEN, give_take.MODE, give_take.DATE_TIME, amount_taken_denom.T_FT, amount_taken_denom.T_OT, amount_taken_denom.T_FH, amount_taken_denom.T_OH, amount_taken_denom.T_FIF, amount_taken_denom.T_TWE, amount_taken_denom.T_TEN, amount_taken_denom.T_FIV, amount_taken_denom.T_TWO, amount_taken_denom.T_ONE, amount_given_denom.G_FT, amount_given_denom.G_OT, amount_given_denom.G_FH, amount_given_denom.G_OH, amount_given_denom.G_FIF, amount_given_denom.G_TWE, amount_given_denom.G_TEN, amount_given_denom.G_FIV, amount_given_denom.G_TWO, amount_given_denom.G_ONE FROM give_take INNER join amount_taken_denom ON give_take.ID = amount_taken_denom.GT_ID INNER JOIN amount_given_denom ON give_take.ID = amount_given_denom.GT_ID WHERE give_take.DAY_NAME = '" +
			day +
			"';";
		selectWithBills =
			"SELECT give_take.ID, bills.BILL_ITEM from give_take INNER JOIN bills on bills.GT_ID = give_take.ID WHERE give_take.DAY_NAME = '" +
			day +
			"';";
	}
	if (day === "All" && id !== "Empty") {
		selectAllNoBill =
			"SELECT give_take.ID, give_take.USER_ID, give_take.TOTAL_BILL, give_take.TOTAL_TAKEN, give_take.TOTAL_GIVEN, give_take.MODE, give_take.DATE_TIME, amount_taken_denom.T_FT, amount_taken_denom.T_OT, amount_taken_denom.T_FH, amount_taken_denom.T_OH, amount_taken_denom.T_FIF, amount_taken_denom.T_TWE, amount_taken_denom.T_TEN, amount_taken_denom.T_FIV, amount_taken_denom.T_TWO, amount_taken_denom.T_ONE, amount_given_denom.G_FT, amount_given_denom.G_OT, amount_given_denom.G_FH, amount_given_denom.G_OH, amount_given_denom.G_FIF, amount_given_denom.G_TWE, amount_given_denom.G_TEN, amount_given_denom.G_FIV, amount_given_denom.G_TWO, amount_given_denom.G_ONE FROM give_take INNER join amount_taken_denom ON give_take.ID = amount_taken_denom.GT_ID INNER JOIN amount_given_denom ON give_take.ID = amount_given_denom.GT_ID WHERE give_take.USER_ID = '" +
			id +
			"';";
		selectWithBills =
			"SELECT give_take.ID, bills.BILL_ITEM from give_take INNER JOIN bills on bills.GT_ID = give_take.ID WHERE give_take.USER_ID = '" +
			id +
			"';";
	}
	if (day !== "All" && id !== "Empty") {
		selectAllNoBill =
			"SELECT give_take.ID, give_take.USER_ID, give_take.TOTAL_BILL, give_take.TOTAL_TAKEN, give_take.TOTAL_GIVEN, give_take.MODE, give_take.DATE_TIME, amount_taken_denom.T_FT, amount_taken_denom.T_OT, amount_taken_denom.T_FH, amount_taken_denom.T_OH, amount_taken_denom.T_FIF, amount_taken_denom.T_TWE, amount_taken_denom.T_TEN, amount_taken_denom.T_FIV, amount_taken_denom.T_TWO, amount_taken_denom.T_ONE, amount_given_denom.G_FT, amount_given_denom.G_OT, amount_given_denom.G_FH, amount_given_denom.G_OH, amount_given_denom.G_FIF, amount_given_denom.G_TWE, amount_given_denom.G_TEN, amount_given_denom.G_FIV, amount_given_denom.G_TWO, amount_given_denom.G_ONE FROM give_take INNER join amount_taken_denom ON give_take.ID = amount_taken_denom.GT_ID INNER JOIN amount_given_denom ON give_take.ID = amount_given_denom.GT_ID WHERE give_take.DAY_NAME = '" +
			day +
			"' AND give_take.USER_ID = '" +
			id +
			"';";
		selectWithBills =
			"SELECT give_take.ID, bills.BILL_ITEM from give_take INNER JOIN bills on bills.GT_ID = give_take.ID WHERE give_take.DAY_NAME = '" +
			day +
			"' AND give_take.USER_ID = '" +
			id +
			"';";
	}

	db.query(selectAllNoBill, (err, withouBills) => {
		if (err) {
			console.log(err);
			return result.status(500).json({ message: err.message });
		} else {
			db.query(selectWithBills, (err, bills) => {
				let noBill = withouBills;
				if (err) {
					console.log(err);
					return result.status(500).json({ message: err.message });
				} else {
					for (let i = 0; i < noBill.length; i++) {
						let array = [];
						for (let j = 0; j < bills.length; j++) {
							if (noBill[i].ID === bills[j].ID) {
								array.push(bills[j].BILL_ITEM);
							}
						}
						noBill[i].BILL_ITEM = array;
					}
					noBill = JSON.stringify(noBill, "", " ");
					fs.writeFileSync("./files/data.pdf", noBill, (err) => {
						if (err) throw err;
					});

					return result.status(200).download("./files/data.pdf", (err) => {
						if (err) {
							console.log(err);
							result.status(500).json({});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
