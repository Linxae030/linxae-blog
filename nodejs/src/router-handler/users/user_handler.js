const db = require("../../db/index");
// 导入 bcryptjs 这个包
const bcrypt = require("bcryptjs");
// 导入生成 Token 的包
const jwt = require("jsonwebtoken");
// 导入全局的配置文件
const config = require("../../config/config");
//导入当前时间
const moment = require("moment");
const nowTime = moment().format("YYYY-MM-DD hh:mm:ss");
//注册用户处理函数
exports.regUser = (req, res) => {
	const userInfo = req.body;
	const checkSqlStr = "select * from tb_user_auth where username = ?";
	db.query(checkSqlStr, [userInfo.username], (err, result) => {
		if (err) return res.cc(err);
		if (result.length > 0) {
			return res.cc("用户名已占用");
		}
		userInfo.password = bcrypt.hashSync(userInfo.password, 10);
		//用户表插入
		const insertSqlStr1 = "insert into tb_user_auth set ?";
		db.query(
			insertSqlStr1,
			{
				username: userInfo.username,
				password: userInfo.password,
				create_time: nowTime,
			},
			(err, results) => {
				// 判断 SQL 语句是否执行成功
				if (err) return res.cc(err);
				// 判断影响行数是否为 1
				if (results.affectedRows !== 1)
					return res.cc("注册用户失败，请稍后再试！");
				//用户信息表插入
				const insertSqlStr2 = "insert into tb_user_info set ?";
				db.query(
					insertSqlStr2,
					{
						email: userInfo.email,
						nickname: userInfo.nickname,
						create_time: nowTime,
					},
					(err, results) => {
						// 判断 SQL 语句是否执行成功
						if (err) return res.cc(err);
						// 判断影响行数是否为 1
						if (results.affectedRows !== 1)
							return res.cc("注册用户失败，请稍后再试！");
						// 注册用户成功
						res.cc("注册成功！", 0);
					}
				);
			}
		);
	});
};
exports.login = (req, res) => {
	const userInfo = req.body;
	//检查是否有该用户
	const sql = "select * from tb_user_auth where username = ?";
	db.query(sql, userInfo.username, (err, result) => {
		// 执行 SQL 语句失败
		if (err) return res.cc(err);
		// 执行 SQL 语句成功，但是获取到的数据条数不等于 1
		if (result.length !== 1) return res.cc("登录失败,没有该用户！");
		const compareResult = bcrypt.compareSync(
			userInfo.password,
			result[0].password
		);
		if (!compareResult) return res.cc("密码错误!");
		//在服务器端生成 Token 的字符串
		if (result[0].login_type === 1) return res.cc("已在登录状态!");
		const user = { ...result[0], password: "" };
		// 对用户的信息进行加密，生成 Token 字符串
		const tokenStr = jwt.sign(user, config.jwtSecretKey, {
			expiresIn: config.expiresIn,
		});
		const loginStr = `update tb_user_auth set login_type = ? where id = ? `;
		db.query(loginStr, [1, result[0].id], (err, result) => {
			if (err) return res.cc(err);
			// 执行 SQL 语句成功，但是获取到的数据条数不等于 1
			if (result.affectedRows !== 1) return res.cc("登录失败！");
			// 调用 res.send() 将 Token 响应给客户端
		});
		res.send({
			status: 0,
			message: "登录成功！",
			token: "Bearer " + tokenStr,
			username: result[0].username,
			id: result[0].id,
		});
	});
};
exports.logout = (req, res) => {
	const userInfo = req.body;
	const sql = "select * from tb_user_auth where username = ?";
	db.query(sql, userInfo.username, (err, result) => {
		if (err) return res.cc(err);
		// 执行 SQL 语句成功，但是获取到的数据条数不等于 1
		if (result.length !== 1) return res.cc("登出失败！");
		const sql = "update tb_user_auth set login_type = ? where id = ?";
		db.query(sql, [0, result[0].id], (err, result) => {
			if (err) return res.cc(err);
			// 执行 SQL 语句成功，但是获取到的数据条数不等于 1
			if (result.affectedRows !== 1) return res.cc("登出失败！");
			res.send({
				status: 0,
				message: "已退出登录！",
			});
		});
	});
};
