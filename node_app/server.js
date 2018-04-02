/*原生写法*/
/*
const http = require('http');

const host = 'localhost';

const port = 8888;

const server = http.createServer((req,res)=>{
	res.write('zrzrzr')
	res.end();
});

server.listen(port,host,()=>{
	  
})
*/

/*express框架*/
const path = require('path')

const express = require('express');

const getColl = require('./db');

let app = express(); //函数返回express所有的对象和方法

const host = '0.0.0.0';//0.0.0.0指localhost+其他网关

const port = 8888;

app.all('*',(req,res,next)=>{//万能jsonp解决跨域
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next();
});

app.use('/html',express.static(path.join(__dirname,"html")))
//将根目录的html文件夹扔到/html路由 访问路径为/html/ajax.html

app.get('/', (req, res) => {
	res.send('zrzrzr');
})

app.all('/getinfo', (req, res) => {
	res.send('用户的核心信息是。。。。')
})

app.get('/movie', (req, res) => {
	let movie = getColl('movies');
	let query = {};
	let update = {};
	movie.find(query, update).toArray((err, data) => {
		if (err) throw err;
		res.json(data);
	})
})

app.get('/movie/:id', (req, res) => {
	  //{id:"44444"}
	let id = req.params.id;
	let query = {
		id
	};
	let update = {};
	getColl('movies').findOne(query,update, (err, data) => {
		if (err) throw err;
		res.json(data);
	});
})

app.get('/moviedetail',(req,res)=>{
	let query = req.query;
	  
	let update = {};
	getColl('movies').find(query,update).toArray((err, data) => {
		if (err) throw err;
		res.json(data);
	});
})


//监听服务器端口
app.listen(port, host, () => {
	  
})