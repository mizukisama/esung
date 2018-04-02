//引入生成随机数的
const random = require('./random');
//引入baset64加密的
const Base64 = require('./base64');
//引入加密模块
const crypto = require('crypto');
module.exports = (password) => {
	let randomWord = random(false, 8);
	let base64 = new Base64();
	//2.对生成的随机数加密
	let base64Random = base64.encode(randomWord);
	//3.将第二步的值与密码拼接
	let newPas = base64Random + password;
	let md5 = crypto.createHash('md5');
	//4.将第三步的进行md5加密
	let md5Pas = md5.update(newPas).digest('hex');
	//5.将第四步进行base64加密
	let base64Md5 = base64.encode(md5Pas);
	//6.将第二步与第五步拼接
	let lastPassword = base64Random + base64Md5;
	//8.返回结果
	return lastPassword;
}