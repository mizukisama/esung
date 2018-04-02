//原生
// const http = require('http');
// http.createServer((req,res)=>{
// 	res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
// 	res.end("hello everybody")
// }).listen(3000)
const {
	host,
	port
} = require('./config.js').appConfig;

const express = require('express'); //路由

const getColl = require('./db');

const path = require("path");

const session = require('express-session');

const cookieParser = require('cookie-parser'); // 方便操作cookies

const bodyParser = require('body-parser'); //  获取 请求的参数   post

const async = require("async");

const moment = require('moment');

//传入json对象，和表名，检查该数据是否存在
//dbisExists({username:username},'users')
const dbisExists = require('./utils/dbisExists');
//用于加密
const encrypt = require('./utils/encrypt');
//用于验证密码是否输入正确
const isTruePwd = require('./utils/isTruePwd');

let app = express();

app.use(bodyParser.json()); // 接口  http://localhost:7000/login?username=qwer  ajax  req.body 
app.use(bodyParser.urlencoded({
	extended: false
})); // form 表单提交 
app.use(cookieParser());
/*登陆session*/
app.use(session({
	secret: "abcc", //生成签名用的字符串
	name: "test", //发送到客户端的key名称
	cookie: {
		maxAge: 3000000
	}, //设置session有效时长为50分钟
	resave: true,
	saveUninitialized: true
}))
/*登陆session*/

app.all('*', (req, res, next) => { //万能解决跨域
	// res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	next();
});


// app.use('/',express.static(path.join(__dirname,'/')))

//编写接口

//路由池 注册一个路由  /movie

app.get('/wh1707', (req, res) => {
	//   
	res.send('努力2个月，年后走上人生巅峰！');
})









//项目的接口
app.get('/getGoods', (req, res) => {
	let query = req.query
	//   
	getColl('goods').find(query, {
		_id: 0
	}).toArray((err, data) => {
		  
		res.json(data)
	})
})
//注册type=2
app.post('/reg', (req, res) => {
	//   
	let userData = req.body;
	let json = {
		username: userData.username
	};

	// dbisExists(json, 'users').then(list => {
	// 	if (list.length == 0) {
	// 		let usersDB = getColl("users");
	// 		let message = {};
	// 		//增加用户权限字段，此路由下注册的全为客户
	// 		userData.type = 2;
	// 		//增加注册日期字段
	// 		userData.createDate = new Date();
	// 		// 对密码进行加密
	// 		userData.password = encrypt(userData.password);
	// 		//   
	// 		// 将数据插入到数据库
	// 		usersDB.insert(userData, (err, info) => {
	// 			if (!err) {
	// 				// 用户注册成功
	// 				message.code = 1;
	// 				res.json(message);
	// 			} else {
	// 				// 注册操作失败 
	// 				message.code = -1;
	// 				res.json(message);
	// 			}
	// 		})

	// 	} else {
	// 		res.json({
	// 			code: 0
	// 		})
	// 	}
	// })

	(async () => {
		try {
			let hasUname = await getColl("users").find(json).toArray();
			if (hasUname.length) { //用户名存在
				res.json({
					code: 0
				})
			} else {
				//增加用户权限字段，此路由下注册的全为客户
				userData.type = 2;
				//增加注册日期字段
				userData.createDate = new Date();
				// 对密码进行加密
				userData.password = encrypt(userData.password);
				//   
				// 将数据插入到数据库
				await getColl("users").insert(userData);
				res.json({
					code: 1
				})
			}
		} catch (err) {
			
			res.json({
				code: -1,
				err: err,
			})
		}

	})()
})

//前台登陆type=2
app.post("/log", (req, res) => {
	//   
	let {
		username,
		password
	} = req.body;

	let query = { //查询不为客户的账号
		$or: [{
				username: username,
				type: 2
			},
			{
				email: username,
				type: 2
			},
			{
				phone: username,
				type: 2
			}
		]
	};
	// dbisExists(query, 'users').then(list => {
	// 	if (list.length == 0) { //用户名不存在
	// 		return res.json({
	// 			code: -1
	// 		})
	// 	}
	// 	let dbpassword = list[0].password;
	// 	if (isTruePwd(password, dbpassword)) {
	// 		req.session.userObj = list[0]; //存入用户信息
	// 		res.json({
	// 			code: 1
	// 		});
	// 	} else {
	// 		res.json({
	// 			code: 0
	// 		});
	// 	}
	// })

	(async() => {
		let hasUname = await getColl("users").find(query).toArray();
		if (!hasUname.length) { //用户名不存在
			return res.json({
				code: -1
			})
		}
		let dbpassword = hasUname[0].password;
		if (isTruePwd(password, dbpassword)) {
			// 
			// 
			req.session.userObj = hasUname[0]; //存入用户信息
			//   
			res.json({
				code: 1
			});
		} else {
			res.json({
				code: 0
			});
		}
	})().catch(err => {
		  
	})
});
//登出
app.post("/logout", (req, res) => {
	if (req) {
		// req.session.userObj
		delete req.session.userObj;
		res.json({
			code: 1
		})
	} else {
		res.json({
			code: 0
		})
	}
});
//isLogin
app.post("/isLogin", (req, res) => {
	
	let userObj = req.session.userObj;
	
	let isLogin = userObj ? true : false;
	if (isLogin) {
		delete userObj.password;
		userObj.createDate = moment(userObj.createDate).format('YYYY-MM-DD HH:mm:ss');
	}
	return res.json({
		isLogin: isLogin,
		userObj: userObj || null,
	})
})

//orderItem
app.post("/orderItem", (req, res) => {

	let orderItem = req.body;
	  
	orderItem.goodsID = Number(orderItem.goodsID)
	let json = {
		username: orderItem.username,
		goodsID: orderItem.goodsID,
		statu: 0
	}
	dbisExists(json, 'orderItem').then(list => {
		if (list.length == 0) { //不存在 
			//   
			getColl("orderItem").insert(orderItem, (err, info) => {
				if (!err) {
					// 购物车添加成功
					res.json({
						code: 1
					});
				} else {
					// 购物车添加失败 

					res.json({
						code: -1
					});
				}
			})
		} else { //已经存在做更新
			  
			getColl("orderItem").update({
				username: orderItem.username,
				goodsID: orderItem.goodsID,
				statu: 0
			}, {
				$inc: {
					goodsNum: orderItem.goodsNum,
					goodsAllPrice: orderItem.goodsAllPrice
				}
			})
		}
	})
})

//updataOrderItem
app.post("/updataOrderItem", (req, res) => {

	let query = {
		username: req.body.username,
		goodsID: req.body.goodsID,
		statu: 0,
	}
	let update = {
		$set: {
			goodsNum: req.body.goodsNum,
			goodsAllPrice: req.body.goodsAllPrice,
		}
	}
	//   
	getColl("orderItem").update(query, update, (err, info) => {
		if (!err) {
			// 后台更新成功

			res.json({
				code: 1
			});
		} else {
			// 后台更新失败 
			res.json({
				code: -1
			});
		}
	})

})
//删除购物车
app.post("/delOrderItem", (req, res) => {
	var json = req.body;

	getColl("orderItem").deleteOne(json, (err, info) => {
		if (!err) {
			res.json({
				code: 1
			})
		}
	})

})

//读取后台购物车
app.get("/cartItem", (req, res) => {
	// let query = {
	// 	username: req.session.userObj.username,
	// 	statu: 0,
	// }
	let query = {
		username:req.query.username,
		statu: 0
	}

	getColl('orderItem').find(query, {
		_id: 0
	}).toArray((err, data) => {
		//   
		res.json(data)
	})
})


//提交订单
app.post("/subOrder", (req, res) => {

	let orderInfo = req.body;
	// 
	// orderInfo.username = req.session.userObj.username;
	orderInfo.productlist = JSON.parse(orderInfo.productlist);
	//   .format('YYYYMMDDHHmmss'))
	orderInfo.orderCode = moment().format('YYYYMMDDHHmmss') + orderInfo.orderCode;
	orderInfo.createDate = new Date();
	// 
	let query = {
		username: req.body.username,
		statu: 0,
	}
	let update = {
		$set: {
			statu: 1,
		}
	}
	//   
	//   
	getColl("orderItem").update(query, update, {
		multi: true
	}, (err, info) => {
		if (!err) {
			// 后台更新成功

			getColl("order").insert(orderInfo, (err, info) => {
				  

				if (!err) {

					res.json({
						code: 1,
						orderCode: orderInfo.orderCode
					});
				} else {
					res.json({
						code: -1
					});
				}
			})
		} else {
			// 后台更新失败 
			res.json({
				code: -1
			});
		}
	})
})
//根据订单号得到订单信息
app.get('/getOrderInfo', (req, res) => {
	let query = req.query
	//   
	getColl('order').find(query, {
		_id: 0
	}).toArray((err, data) => {
		  
		res.json(data)
	})
})


app.listen(port, host, () => {
	
});
