var mysql = require("mysql");
module.exports.dbname = 'pushlive';

var connection = mysql.createConnection({
    host: '14.36.161.116',
	port : '3306',
	//user : 'mngusr1',
	user : 'root',
	password: '#push459026587394#!1234',
	database : 'pushlive'
	
});

connection.connect(function(err) {
	
	if (err) {
		console.error('error connecting: ' + err.stack);
		//res.json({“code” : 100, “status” : “Error in connection database”});
		return;
	

	//console.log('connected as id ' + connection.threadId);
	
    }else {
		console.error('db connected');		
	}
});

module.exports = connection ;
