var express = require("express");
//var filter = require("./lib/filter");
var app = express();
var path=require("path");//引用path模块
//加载数据模块
var ejsTemp=require("ejs");
var url=require("url");
//加载模拟数据
var articles=require("./data/articles")();
//根据参数选择对象
var selectObjById=require("self-pub").getTrueAtc;
//运行ejs模块
app.engine(".html",ejsTemp.__express);
// 设定views变量，意为视图存放的目录
app.set("views",path.join(__dirname,"views"));
//指定模板文件的后缀名为html
app.set("view engine","html"); 

// 设定静态文件目录，比如本地文件,目录为demo/public/images，访问网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, "/")));

var router=express.Router();

router.get("/",function(req,res){
	res.render("visitor/index",{articles:articles});
	res.end();
});
router.get("/page",function(req,res){
	var articleId=parseInt(url.parse(req.url,true).query.id);
	// var getTrueAtc=function(){
	// 	var trueAtc={};
	// 	for(var i=0,len=articles.length;i<len;i++){
	// 		if(articles[i]["id"] === articleId){
	// 			trueAtc = articles[i];
	// 			break;
	// 		}
	// 	}
	// 	return trueAtc;
	// }
	
	res.render("visitor/article",{article:selectObjById(articles,"id",articleId)});
	res.end();
});

// router.get("/about",function(req,res){
// 	res.render("user/about", {title:"自我介绍"});
//  });
// router.get("/login",function(req,res){
// 	res.render("user/login", {title:"登录"});
//  });
// router.get("/signup",function(req,res){
// 	res.render("user/signup", {title:"注册"});
//  });

// app.get("/message",function(req,res,next){ //  get请求返回json
// 	var url=req.url;
// 	var args=url.replace(/.+args=/,");

//     res.send({status:"json","args":args});
// });

app.use("/",router);
app.listen(3000);

