/**
 * 全局配置文件
 */
const glob = require('glob');
const path = require('path');
const fs = require('fs');
// 获取所有页面 生成多页面的集合
const getFileNameList = path => {
	let fileList = [];
	let dirList = fs.readdirSync(path);
	dirList.forEach(item => {
		if (item.indexOf('html') > -1) {
			fileList.push(item.split('.')[0]);
		}
	});
	return fileList;
};
// 项目中的html文件，不需要后缀
let HTMLDirs = getFileNameList('./src/page');
module.exports = {
	HTMLDirs: HTMLDirs,
	serverPath:'http://39.107.78.155/vue/esung/'
}