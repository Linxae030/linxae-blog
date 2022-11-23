const moment = require("moment");
//格式化输出时间
exports.parseOut = (list) => {
	list.forEach((item) => {
		if (item.create_time)
			item.create_time = moment(item.create_time).format(
				"YYYY-MM-DD HH:mm:ss"
			);
		if (item.update_time)
			item.update_time = moment(item.update_time).format(
				"YYYY-MM-DD HH:mm:ss"
			);
	});
};
