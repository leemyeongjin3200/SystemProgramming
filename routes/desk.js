var express = require('express');
var router = express.Router();
var pool = require('../lib/mysql.js').pool;

exports.login = function(req, res){
    var stuId = req.query.stuId;
    console.log(stuId);
    pool.getConnection(function(err, conn){
        if(err){
            console.log("DB CONNECTION ERROR");
            conn.release();
        }else{
            conn.query("SELECT * FROM STUDENT WHERE STU_ID = ?", [stuId], function(err, rows){
                if(err){
                    console.log("DB QUERY ERROR");
                    conn.release();
                }else{
                    if(rows.length == 0){
                        res.send({result : -1, stuId : stuId});
                        console.log('없음');
                    }else{
                        if(rows[0].stu_life == 0){
                            res.send({result : 0, stuId : stuId});
                        }else{
                            res.send({result : 1, stu_life : rows[0].stu_life, stuId : stuId});
                        }
                    }
                }
            })
        }
    })
}