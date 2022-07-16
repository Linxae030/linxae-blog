const db = require("../../db/index");
const moment = require("moment");
const nowTime = moment().format("YYYY-MM-DD hh:mm:ss");

exports.getTags = (req, res) => {
	const sql = "select * from tb_tag";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("当前无可用标签");
		}
		res.send({
			status: 0,
			message: "获取成功",
			tags: result,
		});
	});
};
exports.getCategories = (req, res) => {
	const sql = "select * from tb_category";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("当前无可用分类");
		}
		res.send({
			status: 0,
			message: "获取成功",
			categories: result,
		});
	});
};
