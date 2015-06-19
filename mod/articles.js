var fs=require("fs");
var path=require("path");

module.exports = function(callback){
	fs.readFile(path.join(__dirname, '../data/articleData.txt'),{encoding:'utf-8'},function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log("文章数据读取成功！");
			if(typeof callback === "function"){
				callback(JSON.parse(data));
			}
		}
	});
}