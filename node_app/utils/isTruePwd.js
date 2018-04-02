//引入生成随机数的
const random = require('./random');
//引入baset64加密的
const Base64 = require('./base64');
//引入加密模块
const crypto = require('crypto');
module.exports = (password, dbpassword) => {
	//1.数据库中的密码截取前面随机数通过base64加密的结果
	let base64Random = dbpassword.substring(0, 12);
	//2.将第一步的结果与用户输入的密码拼接
	let newPas = base64Random + password;
	//3.将第二步的结果进行MD5加密
	let md5 = crypto.createHash('md5');
	let md5Pas = md5.update(newPas).digest('hex');
	//4.将第三步进行base64加密
	let base64 = new Base64();
	let base64Md5 = base64.encode(md5Pas);
	//5.将第一步与第四步拼接
	let lastPassword = base64Random + base64Md5;
	return lastPassword === dbpassword
}
