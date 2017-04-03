var express = require('express');
var router = express.Router();
var _DBPool = require('../lib/dbpool_mysql');
var config = require('../lib/config');

exports.testPage = function (req, res){
    res.render('testPopup');
}

exports.authDomain = function (req, res){
    var cp_key = req.body.cp_key;
    var domain = req.body.domain;
    
    _DBPool.acquire(function (err, db) {
        if (err) {
            _DBPool.release(db);
            res.end("Connection err : " + err);
        } else {
            db.query("CALL GET_DOMAIN_AUTH(?,?)", [cpKey, domain], function (err, result) {
                if (err) {
                    _DBPool.release(db);
                    console.log(err);
                    res.end("DB ERROR : " + err);
                } else {
                    res.json(result[0][0]);
                }
            })
        }
    });
}