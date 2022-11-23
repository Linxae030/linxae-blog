const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
	//保存路径
	destination: function (req, file, cb) {
		cb(null, "S:/CodeField/linxae-blog/nodejs/temp");
		//注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
	},
	//保存在 destination 中的文件名
	filename: function (req, file, cb) {
		cb(null, "cover" + "-" + file.fieldname + "-" + Date.now());
	},
});
const upload = multer({ storage: storage });

const files_handler = require("../../router-handler/files/files_handler");

router.post("/uploadImg", upload.any(), files_handler.uploadImg);

module.exports = router;
