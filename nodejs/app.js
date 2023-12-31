const joi = require("@hapi/joi");
const express = require("express");
// const jsonFile = require("jsonfile");
const multer = require("multer");

//创建服务器实例
const app = express();
app.use(express.static("./uploads/article"));
//导入并配置跨域cors中间件
const cors = require("cors");
app.use(cors());

//设置request的解释方式
app.use(express.json());
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }));

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
	res.cc = function (err, status = 1) {
		res.send({
			status,
			message: err instanceof Error ? err.message : err,
		});
	};
	next();
});

//解析 Token 的中间件
const expressJWT = require("express-jwt");
const config = require("./src/config/config");

app.use(
	expressJWT({ secret: config.jwtSecretKey }).unless({
		path: [
			/^\/api|^\/articles\/getArticleList|^\/articles\/getTagsById|^\/articles\/getArticleById/,
		],
	})
);

//文件上传中间件
// let objMulter = multer({ dest: './uploads' }); //dest: 指定 保存位置（存到服务器)
// app.use(objMulter.any());  //允许上传什么类型文件,any 代表任何类型

//文件模块
const filesRouter = require("./src/router/files/files");
//用户模块
const userRouter = require("./src/router/users/user");
//文章模块
const articlesRouter = require("./src/router/articles/articles");
app.use("/api", userRouter);
app.use("/articles", articlesRouter);
app.use("/files", filesRouter);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
	// 验证失败导致的错误
	if (err instanceof joi.ValidationError) return res.cc(err);
	// 身份认证失败后的错误
	if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
	// 未知的错误
	res.cc(err);
});

// 启动服务器
app.listen(3008, () => {
	console.log("api server running at http://127.0.0.1:3008");
});
