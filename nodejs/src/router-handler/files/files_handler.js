const db = require("../../db/index");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const nowTime = moment().format("YYYY-MM-DD hh:mm:ss");

exports.uploadImg = (req, res) => {
	//获取文件信息对象
	let imgFile = req.files[0];
	//存放临时路径
	let temp = imgFile.path;
	console.log("temp", temp);
	//获取文件后缀名
	let ext = path.extname(imgFile.originalname);
	//定义新文件名，随机输防止缓存
	let newName =
		"" + (new Date().getTime() + Math.round(Math.random() * 10000) + ext);
	//定义新路径存入指定文件夹
	let newPath = "../../../uploads/article/" + newName;
	//读出二进制数据
	let fileData = fs.readFileSync(temp);
	//二进制数据重新写入指定文件夹
	fs.writeFileSync(path.join(__dirname, newPath), fileData);
	//删除临时文件
	fs.unlinkSync(temp);
	//返回图片地址
	let newUrl = "http://127.0.0.1:3008/uploads/articles/" + newName;
	res.send({ status: 0, newUrl });
};
