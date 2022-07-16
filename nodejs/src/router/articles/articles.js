const express = require("express");
const router = express.Router();

const articles_handler = require("../../router-handler/articles/articles");

//获取标签
router.get("/tags", articles_handler.getTags);
//获取分类
router.get("/categories", articles_handler.getCategories);

module.exports = router;
