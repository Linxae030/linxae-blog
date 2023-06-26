const db = require("../../db/index");
const moment = require("moment");
const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
const { parseOut } = require("../../utils/utils");
//获取标签
exports.getTags = (req, res) => {
	const sql = "select * from tb_tag";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("当前无可用标签");
		}
		parseOut(result);
		res.send({
			status: 0,
			message: "获取成功",
			fileList: result,
		});
	});
};
//删除标签
exports.deleteTag = (req, res) => {
	let id = req.query.id;
	const sql = "delete from tb_tag where id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) return res.cc(err);
		if (result.affectedRows <= 0) {
			return res.cc("删除失败");
		}
		res.send({
			status: 0,
			message: "删除成功",
		});
	});
};
//添加标签
exports.addTag = (req, res) => {
	let tagName = req.body.tag_name;
	const sql = `select * from tb_tag where tag_name = ?`;
	db.query(sql, [tagName], (err, result) => {
		if (err) return res.cc(err);
		if (result.length >= 1) {
			return res.cc("该标签已存在！");
		}
		const sql = "insert into tb_tag set ?";
		db.query(
			sql,
			{
				tag_name: tagName,
				create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			(err, result) => {
				if (err) return res.cc(err);
				if (result.affectedRows <= 0) {
					return res.cc("标签添加失败");
				}
				res.send({
					status: 0,
					message: "标签添加成功",
				});
			}
		);
	});
};
//更新标签
exports.updateTag = (req, res) => {
	let tag = req.body;
	console.log("tag", tag);
	const sql = `select * from tb_tag where tag_name = ?`;
	db.query(sql, [tag.tagName], (err, result) => {
		if (err) return res.cc(err);
		if (result.length >= 1) {
			return res.cc("该标签已存在！");
		}
		const sql = `update tb_tag set ? where id = ${tag.id}`;
		db.query(
			sql,
			{
				tag_name: tag.tagName,
				update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			(err, result) => {
				if (err) return res.cc(err);
				if (result.affectedRows < 1) {
					return res.cc("修改失败!");
				}

				res.send({
					status: 0,
					message: "标签修改成功",
				});
			}
		);
	});
};
//根据id获取标签
exports.getTagsById = (req, res) => {
	let id = req.query.id;
	const sql = "SELECT id,tag_name FROM tb_tag where id =any(SELECT tag_id FROM tb_article_tag WHERE article_id = ?)";
	db.query(sql, [id], (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("该文章没有标签");
		}
		res.send({
			status: 0,
			message: "获取成功",
			tags: result,
		});
	});
};
//获取分类
exports.getCategories = (req, res) => {
	const sql = "select * from tb_category";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("当前无可用分类");
		}
		parseOut(result);
		res.send({
			status: 0,
			message: "获取成功",
			categories: result,
		});
	});
};
//删除分类
exports.deleteCategory = (req, res) => {
	let id = req.query.id;
	const sql = "delete from tb_category where id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) return res.cc(err);
		if (result.affectedRows <= 0) {
			return res.cc("删除失败");
		}
		res.send({
			status: 0,
			message: "删除成功",
		});
	});
};
//添加分类
exports.addCategory = (req, res) => {
	let cateName = req.body.cate_name;
	const sql = `select * from tb_category where category_name = ?`;
	db.query(sql, [cateName], (err, result) => {
		if (err) return res.cc(err);
		if (result.length >= 1) {
			return res.cc("该分类已存在！");
		}
		const sql = "insert into tb_category set ?";
		db.query(
			sql,
			{
				category_name: cateName,
				create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			(err, result) => {
				if (err) return res.cc(err);
				if (result.affectedRows <= 0) {
					return res.cc("分类添加失败");
				}
				res.send({
					status: 0,
					message: "分类添加成功",
				});
			}
		);
	});
};
//更新分类
exports.updateCategory = (req, res) => {
	let cate = req.body;
	const sql = `select * from tb_category where category_name = ?`;
	db.query(sql, [cate.cateName], (err, result) => {
		if (err) return res.cc(err);
		if (result.length >= 1) {
			return res.cc("该分类已存在！");
		}
		const sql = `update tb_category set ? where id = ${cate.id}`;
		db.query(
			sql,
			{
				category_name: cate.cateName,
				update_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			},
			(err, result) => {
				if (err) return res.cc(err);
				if (result.affectedRows < 1) {
					return res.cc("修改失败!");
				}

				res.send({
					status: 0,
					message: "分类修改成功",
				});
			}
		);
	});
};
//上传文章
exports.postArticle = (req, res) => {
	let articleInfo = req.body;
	let userInfo = req.user;
	let tagList;
	if (typeof articleInfo.tag_list === "object") {
		tagList = articleInfo.tag_list;
	} else {
		tagList = JSON.parse(articleInfo.tag_list);
	}
	console.log("articleInfo.is_top", articleInfo.is_top);
	const sql = "insert into tb_article set ?";
	db.query(
		sql,
		{
			user_id: userInfo.id,
			category_id: articleInfo.category_id,
			article_cover: articleInfo.article_cover,
			article_title: articleInfo.article_title,
			article_content: articleInfo.article_content,
			article_content_md: articleInfo.article_content_md,
			type: articleInfo.type,
			is_top: articleInfo.is_top,
			create_time: nowTime,
			tags: tagList.toString(),
		},
		(err, result) => {
			if (err) return res.cc(err);
			if (result.affectedRows <= 0) {
				return res.cc("文章发布失败");
			}
			if (articleInfo.is_top === 1) {
				const topSql1 = "update tb_article set is_top = 1 where id = ?";
				db.query(topSql1, [result.insertId]);
				const topSql2 = "update tb_article set is_top = 0 where id != ?";
				db.query(topSql2, [result.insertId]);
			}
			//发布文章后删除现有草稿
			const deleSql = "truncate table tb_article_draft";
			db.query(deleSql);
			res.send({
				status: 0,
				message: "文章发布成功",
			});
		}
	);
};
//更新文章
exports.updateArticle = (req, res) => {
	let articleInfo = req.body;
	let userInfo = req.user;
	let tagList;
	if (typeof articleInfo.tag_list === "object") {
		tagList = articleInfo.tag_list;
	} else {
		tagList = JSON.parse(articleInfo.tag_list);
	}
	const sql = `update tb_article set ? where id = ${articleInfo.id}`;
	db.query(
		sql,
		{
			user_id: userInfo.id,
			category_id: articleInfo.category_id,
			article_cover: articleInfo.article_cover,
			article_title: articleInfo.article_title,
			article_content: articleInfo.article_content,
			article_content_md: articleInfo.article_content_md,
			type: articleInfo.type,
			is_top: articleInfo.is_top,
			update_time: nowTime,
		},
		(err, resultUp) => {
			if (err) return res.cc(err);
			if (resultUp.affectedRows <= 0) {
				return res.cc("文章更新失败");
			}
			//先删除原有的tag
			const sql = `delete from tb_article_tag where article_id = ${articleInfo.id}`;
			db.query(sql, (err, resultDe) => {
				if (err) return res.cc(err);
				if (resultDe.affectedRows < 0) {
					return res.cc("文章更新失败");
				}
				//tag插入tag表中
				tagList.forEach(element => {
					const sql = `insert into tb_article_tag set ?`;
					db.query(sql, { article_id: articleInfo.id, tag_id: element }, (err, resultIn) => {
						if (err) return res.cc(err);
						return;
					});
				});
			});
			if (articleInfo.is_top == 1) {
				const topSql1 = "update tb_article set is_top = 1 where id = ?";
				db.query(topSql1, [articleInfo.id]),
					(err, result) => {
						console.log("result", result);
					};
				const topSql2 = "update tb_article set is_top = 0 where id != ?";
				db.query(topSql2, [articleInfo.id]);
			}
			res.send({
				status: 0,
				message: "文章更新成功",
			});
		}
	);
};
//获取文章
exports.getArticleList = (req, res) => {
	const sql = "SELECT * FROM tb_article where is_delete != 1";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("暂无文章");
		}
		parseOut(result);
		res.send({
			status: 0,
			message: "文章列表获取成功",
			articleList: result,
		});
	});
};
//获取文章部分内容
exports.getArticlePartList = (req, res) => {
	const sql = "SELECT id,article_title,create_time,category_id,type,is_top FROM tb_article where is_delete != 1";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("暂无文章");
		}
		parseOut(result);
		res.send({
			status: 0,
			message: "文章列表获取成功",
			articleList: result,
		});
	});
};
//根据Id获取文章
exports.getArticleById = (req, res) => {
	let id = req.query.id;
	const sql = "SELECT * FROM tb_article where id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("未查询到此文章");
		}
		res.send({
			status: 0,
			message: "获取成功",
			article: result[0],
		});
	});
};
//删除文章
exports.deleteArticle = (req, res) => {
	let id = req.query.id;
	const sql = "update tb_article set is_delete = 1 where id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) return res.cc(err);
		if (result.affectedRows < 0) {
			return res.cc("删除失败");
		}
		res.send({
			status: 0,
			message: "删除成功",
		});
	});
};
//删除文章（物理）
exports.deleteArticleTrue = (req, res) => {
	let id = req.query.id;
	const sql = "delete from tb_article where id = ?";
	db.query(sql, [id], (err, result) => {
		if (err) return res.cc(err);
		if (result.affectedRows < 0) {
			return res.cc("物理删除失败");
		}
		res.send({
			status: 0,
			message: "物理删除成功",
		});
	});
};
//上传草稿
exports.postDraft = (req, res) => {
	let draftInfo = req.body;
	//先删除原保存草稿
	const deleSql = "truncate table tb_article_draft";
	db.query(deleSql, (err, result) => {
		if (err) return res.cc(err);
		if (result.affectedRows < 0) {
			return res.cc("草稿上传失败");
		}
		//再插入现草稿
		const sql = "insert into tb_article_draft set ?";
		db.query(
			sql,
			{
				article_title: draftInfo.article_title,
				article_content: draftInfo.article_content,
				create_time: nowTime,
			},
			(err, result) => {
				if (err) return res.cc(err);
				if (result.affectedRows <= 0) {
					return res.cc("草稿上传失败");
				}
				res.send({
					status: 0,
					message: "草稿已保存",
				});
			}
		);
	});
};
//获取草稿
exports.getDraft = (req, res) => {
	const sql = "select * from tb_article_draft";
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		if (result.length <= 0) {
			return res.cc("草稿获取失败");
		}
		res.send({
			status: 0,
			message: "草稿获取成果",
			draft: result[0],
		});
	});
};
