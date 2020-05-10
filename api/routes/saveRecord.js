const express = require("express");
const db = require("../../db");

const router = express.Router();

router.post("/", async (req, result, next) => {
	const {
		userId,
		totalBill,
		totalTaken,
		totalGiven,
		mode,
		t_ft,
		t_ot,
		t_fh,
		t_oh,
		t_fif,
		t_twe,
		t_ten,
		t_fiv,
		t_two,
		t_one,
		listData,
		g_ft,
		g_ot,
		g_fh,
		g_oh,
		g_fif,
		g_twe,
		g_ten,
		g_fiv,
		g_two,
		g_one,
	} = req.body;
	const give_take_insert =
		"insert into give_take (USER_ID,TOTAL_BILL,TOTAL_TAKEN,TOTAL_GIVEN,MODE) values ('" +
		userId +
		"','" +
		totalBill +
		"','" +
		totalTaken +
		"','" +
		totalGiven +
		"','" +
		mode +
		"');";
	function asynqQuery(query) {
		return new Promise((resolve, reject) => {
			db.query(query, (err, result) => {
				if (err) return reject(err);
				resolve(result);
			});
		});
	}
	try {
		await asynqQuery(
			"DELETE FROM `give_take` WHERE DATE(`DATE_TIME`) <= DATE(NOW() - INTERVAL 7 DAY)"
		);
		const res = await asynqQuery(give_take_insert);
		const amount_taken_insert =
			"insert into amount_taken_denom (TOTAL_TAKEN,T_FT,T_OT,T_FH,T_OH,T_FIF,T_TWE,T_TEN,T_FIV,T_TWO,T_ONE,GT_ID) values('" +
			totalTaken +
			"','" +
			t_ft +
			"','" +
			t_ot +
			"','" +
			t_fh +
			"','" +
			t_oh +
			"','" +
			t_fif +
			"','" +
			t_twe +
			"','" +
			t_ten +
			"','" +
			t_fiv +
			"','" +
			t_two +
			"','" +
			t_one +
			"','" +
			res.insertId +
			"');";
		await db.query(amount_taken_insert);
		const amount_given_insert =
			"insert into amount_given_denom (GT_ID,TOTAL_GIVEN,G_FT,G_OT,G_FH,G_OH,G_FIF,G_TWE,G_TEN,G_FIV,G_TWO,G_ONE) values('" +
			res.insertId +
			"','" +
			totalGiven +
			"','" +
			g_ft +
			"','" +
			g_ot +
			"','" +
			g_fh +
			"','" +
			g_oh +
			"','" +
			g_fif +
			"','" +
			g_twe +
			"','" +
			g_ten +
			"','" +
			g_fiv +
			"','" +
			g_two +
			"','" +
			g_one +
			"');";
		await db.query(amount_given_insert);
		for (let i = 0; i < listData.length; i++) {
			const bills_insert =
				"insert into bills (GT_ID,TOTAL_BILL,BILL_ITEM) values('" +
				res.insertId +
				"','" +
				totalBill +
				"','" +
				listData[i].title +
				"');";
			await db.query(bills_insert);
		}
		return await result.status(201).json({});
	} catch (error) {
		result.status(500).json({ message: error.message });
	}
});

module.exports = router;
