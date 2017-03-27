
// http://rocksea.tistory.com/175
var generic_pool = require('generic-pool');
var config = require('./config'); 
var mysql = require('mysql');

var pool = generic_pool.Pool({
        name: 'mysql',
        create: function(callback) {
                var config_ = {
                        host : config.db.host, 											
                        port : config.db.port, 
                        user : config.db.user,						
                        password : config.db.password, 
                        database : config.db.defaultdatabase 
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
        min: config.pool.min,
        max: config.pool.max,
        idleTimeoutMillis : config.pool.idleTimeoutMillis, // 30초
        log : false
});
  
process.on("exit", function() {
  pool.drain(function () {
    pool.destroyAllNow();
  });
});
 
module.exports = pool;
module.exports.dbname = 'pushdev';