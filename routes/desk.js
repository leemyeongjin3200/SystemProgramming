var express = require('express');
var router = express.Router();
var pool = require('../lib/mysql.js').pool;
var multiparty = require('multiparty');

require('date-utils');

exports.login = function(req, res){
    var stuId = req.query.stuId;
    var tableNum = req.query.tableNum;

    pool.getConnection(function(err, conn){
        if(err){
            console.log("DB CONNECTION ERROR");
            conn.release();
            res.json({result:-3, contents:"DB CONNECTION ERROR"});
        }else{
            conn.query("SELECT t_ifon FROM t_table WHERE t_num = ?", [tableNum], function(err, rows){
               if(err){
                   console.log("SELECT t_ifon ERROR");
                   conn.release();
                   res.json({result:-1});
               }else{
                   var check = rows[0].t_ifon;
                   if(check == 0){
                       console.log("사용가능");
                        conn.query("SELECT num, stu_life FROM student WHERE stu_id = ?", [stuId], function(err, rows){
                            if(rows.length == 0){
                                conn.release();
                                res.send({'result': -1});
                            }else{
                                var stuNum = rows[0].num;
                                var stuLife = rows[0].stu_life;

                                if(stuLife > 0){
                                    conn.query("UPDATE student SET stu_iflogin = true WHERE stu_id = ?", [stuId], function(err, rows){
                                        conn.query("UPDATE t_table SET t_ifon = true, t_stunum = ? WHERE t_num = ?", [stuNum, tableNum], function(err, rows){
                                            var dt = new Date();
                                            var dateNow = dt.toFormat("HH24MISS");
                                            conn.release();
                                            res.send({'result':1,'stuid':parseInt(stuId),'stulife':stuLife,'time':parseInt(dateNow)});

                                        });
                                    });
                                }else{
                                    console.log("경고누적으로 이용불가");
                                    conn.release();
                                    res.send({result:-2});
                                }
                            }

                        })
                   }else{
                       console.log("이미사용중");
                       conn.release();
                       res.send({result:-1});
                   }
               }
            });
        }
    })
}

exports.logout = function(req, res){
    var stuId = req.query.stuId;
    var tableNum = req.query.tableNum;

    pool.getConnection(function(err, conn){
        if(err){
            console.log("DB CONNECTION ERROR");
            conn.release();
        }else{
            conn.query("UPDATE student SET stu_iflogin = false WHERE stu_id = ?", [stuId], function(err, results){
                console.log(results.changedRows);
                if(results.changedRows == 0){
                    res.send({result : -1});
                }else{
                    conn.query("UPDATE t_table SET t_ifon = false, t_stunum = null WHERE t_num = ?", [tableNum], function(err, results){
                        conn.release();
                        res.send({result : 1});
                    });
                }
            });
        }
    });
}

exports.getLife = function(req, res){
    var stuId = req.query.stuId;

    pool.getConnection(function(err, conn){
        if(err){
            console.log("Connection error");
            conn.release();
        }else{
            conn.query("SELECT stu_life FROM student WHERE stu_id = ?", [stuId], function(err, rows){
                if(rows.length == 0){
                    conn.release();
                    res.send({result:-1});
                }else{
                    conn.release();
                    res.send({result:1, stuLife : rows[0].stu_life});
                }

            })
        }
    })
}

exports.report = function(req, res){
    var targetTable = req.query.tableNum;

    pool.getConnection(function(err, conn){
        if(err){
            console.log("Connection Error");
            conn.release();
        }else{
            conn.query("SELECT * FROM student a INNER JOIN t_table b ON a.num = b.t_stunum WHERE b.t_num = ?", [targetTable], function(err, rows){
                if(rows.length == 0){
                    conn.release();
                    res.send({result:-1});
                }else{
                    var stuLife = rows[0].stu_life - 1;
                    var stuId = rows[0].stu_id;
                    conn.query("UPDATE student SET stu_life=? WHERE stu_id = ?", [stuLife, stuId], function(err, results){
                        conn.release();
                        res.send({result:1});
                    })
                }

            });
        }
    });
}

exports.uploadImage = function(req, res){
    console.log(req);
    /*var form = new multiparty.Form();

    form.on('part',function(part){
        var filename;
        var size;
        if (part.filename) {
            filename = part.filename;
            size = part.byteCount;
        }else{
            part.resume();
        }

        console.log("Write Streaming file :"+filename);
        var writeStream = fs.createWriteStream('/tmp/'+filename);
        writeStream.filename = filename;
        part.pipe(writeStream);

        part.on('data',function(chunk){
            console.log(filename+' read '+chunk.length + 'bytes');
        });

        part.on('end',function(){
            console.log(filename+' Part read complete');
            writeStream.end();
        });
    });

    // all uploads are completed
    form.on('close',function(){
        res.send({'result':1});
    });

    // track progress
    form.on('progress',function(byteRead,byteExpected){
        console.log(' Reading total  '+byteRead+'/'+byteExpected);
    });

    form.parse(req);*/
}