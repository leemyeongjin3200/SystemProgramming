/**
 * Created by Owner on 2016-06-01.
 */
var schedule = require('node-schedule');
var pool = require('./mysql.js').pool;

console.log("Scheduler is Running");
exports.initLife = schedule.scheduleJob('0 0 15 * * *', function() {
    pool.getConnection(function(err, conn){
        if(err){
            console.log("CONNECTION ERROR");
            conn.release();
        }else{
            conn.query("UPDATE STUDENT SET stu_life = 4", function (err, results) {
                if (err) {
                    console.log("DB QUERY ERROR");
                    conn.release();
                } else {
                    console.log(results);
                }

                conn.release();
            });
        }
    })
});