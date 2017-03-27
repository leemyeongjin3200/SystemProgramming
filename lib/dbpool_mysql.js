
// http://rocksea.tistory.com/175
var generic_pool = require('generic-pool');
var config = require('./config'); 
var mysql = require('mysql');

var pool = generic_pool.Pool({
        name: 'mysql',
        create: function(callback) {
                var config_ = {
                        host : '14.36.161.116', 											
                        port: '3306',
                        user: 'root',
                        password: '#push459026587394#!1234',
                        database: 'pushlive'
                }
                var client = mysql.createConnection(config_);
                client.connect(function (error){
                  if(error){
                    console.log(error);
                  }
                  callback(error, client);
                });
        },
        destroy: function(client) {
          client.end();
        },
        min: 5,
        max: 10000,
        idleTimeoutMillis : 30000, // 30초
        log : false
});
  
process.on("exit", function() {
  pool.drain(function () {
    pool.destroyAllNow();
  });
});
 
module.exports = pool;
module.exports.dbname = 'pushdev';