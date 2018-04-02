var getColl = require("../db.js");

/**
 * 传入一个用户名  即可返回该用户名对应在数据库内的数据列表
 */
module.exports = (json,collName) => {

    return new Promise((resolve, reject) => {

        var coll = getColl(collName);

        coll.find(json).toArray((error, list) => {
            if (!error) {
                //查询成功
                resolve(list);   
            } else {
                //查询失败
                reject(error);
            }
        });

    });

}