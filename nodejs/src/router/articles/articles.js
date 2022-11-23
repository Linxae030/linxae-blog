const express = require("express");
const router = express.Router();

const articles_handler = require("../../router-handler/articles/articles_handler");

//获取标签列表
router.get("/tags", articles_handler.getTags);
//删除标签
router.post("/deleteTag", articles_handler.deleteTag);
//添加标签
router.post("/updateTag", articles_handler.updateTag);
//更新标签
router.post("/addTag", articles_handler.addTag);
//获取某个文章的标签
router.get("/getTagsById", articles_handler.getTagsById);
//获取分类列表
router.get("/categories", articles_handler.getCategories);
//删除分类
router.post("/deleteCategory", articles_handler.deleteCategory);
//更新分类
router.post("/updateCategory", articles_handler.updateCategory);
//添加分类
router.post("/addCategory", articles_handler.addCategory);
//上传文章
router.post("/postArticle", articles_handler.postArticle);
//更新文章
router.post("/updateArticle", articles_handler.updateArticle);
//获取文章
router.get("/getArticleList", articles_handler.getArticleList);
//获取文章部分内容
router.get("/getArticlePartList", articles_handler.getArticlePartList);
//通过id获取文章
router.get("/getArticleById", articles_handler.getArticleById);
//删除文章
router.post("/deleteArticle", articles_handler.deleteArticle);
//物理删除文章
router.post("/deleteArticleTrue", articles_handler.deleteArticleTrue);
//上传草稿
router.post("/postDraft", articles_handler.postDraft);
//获取草稿
router.get("/getDraft", articles_handler.getDraft);
module.exports = router;
