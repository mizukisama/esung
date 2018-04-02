const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');//断言包
// const {host,port,dbName} = require('./config.js').dbConfig;
// Connection URL

const {
	host,
	port,
	dbName,
	username,
	password
} = require('./config.js').dbConfig;
let url = '';
// Connection URL
if (username) {
	url = `mongodb://${username}:${password}@${host}:${port}`;
} else {
	url = `mongodb://${host}:${port}`;
}

// Database Name
let db = null;
// Use connect method to connect to the server
MongoClient.connect(url, (err, client)=> {
  assert.equal(null, err);
  
  db = client.db(dbName); 
});

module.exports = collName =>{
	return db.collection(collName);
}

