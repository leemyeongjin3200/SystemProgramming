/**
 * Created by Owner on 2016-05-27.
 */
var mysql = require('mysql');

exports.pool = mysql.createPool({
    host    : 'us-cdbr-iron-east-04.cleardb.net',
    port    : 3306,
    user    : 'bd59b0f532a170',
    password: 'f0616901',
    database: 'heroku_825fa05358f20a8',
    connectionLimit: 10
});
