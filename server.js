var express = require("express");
var app = express();
var path=require("path");//引用path模块
//加载数据模块
var ejsTemp=require("ejs");
var url=require("url");
var bodyParser = require("body-parser"); 
//根据参数选择对象
var selectObjById=require("self-pub").getTrueAtc;
//处理接收到的数据
var dealData=require("deal-data");


//**********************加载模拟数据**************************
app.use(bodyParser.urlencoded({ extended: false })); 

var getArticles=require("./mod/articles");
var getUsers=require("./mod/users");

//运行ejs模块
app.engine(".html",ejsTemp.__express);
// 设定views变量，意为视图存放的目录
app.set("views",path.join(__dirname,"views"));
//指定模板文件的后缀名为html
app.set("view engine","html"); 

// 设定静态文件目录，比如本地文件,目录为demo/public/images，访问网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, "/")));
var router=express.Router();

//文章列表 & 首页
router.get("/",function(req,res){
	getArticles(function(data){
		res.render("visitor/index",{articles:data});
		res.end();
	});
});

//文章详情页
router.get("/page",function(req,res){
	var articleId=parseInt(url.parse(req.url,true).query.id);
	getArticles(function(data){
		res.render("visitor/article",{article:selectObjById(data,"id",articleId)});
		res.end();
	});
	
});

//用户列表
router.get("/users",function(req,res){
	getUsers(function(data){
		res.render("visitor/user",{users:data});
		res.end();
	});
});

//用户详情页面
router.get("/user",function(req,res){
	var userId=parseInt(url.parse(req.url,true).query.id);
	getUsers(function(data){
		console.log(selectObjById(data,"id",userId));
		res.render("visitor/info",{user:selectObjById(data,"id",userId)});
		res.end();
	});
});

// router.get("/login",function(req,res){
// 	res.render("user/login", {title:"登录"});
//  });

//  get请求返回json
app.get("/message",function(req,res,next){ 
	var args=url.parse(req.url,true).query.args;
    res.send({status:"jsonget","args":args});
    res.end();
});

//  post请求返回json
app.post("/message",function(req,res,next){ 
	var args=url.parse(req.url,true).query.args;
    res.send({status:"jsonpost","args":args});
    res.end();
});

//注册页面
router.get("/signup",function(req,res){
	res.render("user/signup", {title:"注册"});
	res.end();
 });

//注册事件处理
app.post("/register",function(req,res,next){ 
    res.send({status:"1","data":"注册成功！"});
    dealData.signup(req.body);
    res.end();
});

app.use("/",router);
app.listen(3000);

