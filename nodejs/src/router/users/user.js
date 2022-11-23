const express = require("express");
const router = express.Router();

// 导入用户路由处理函数对应的模块
const user_handler = require("../../router-handler/users/user_handler");

//注册
router.post("/register", user_handler.regUser);
// 登录
router.post("/login", user_handler.login);
//登出
router.post("/logout", user_handler.logout);
module.exports = router;
