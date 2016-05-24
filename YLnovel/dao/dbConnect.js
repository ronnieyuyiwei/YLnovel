/**
 * Created by Yu Yiwei on 2016/5/24.
 */
var mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'ylnovel',
    multipleStatements: true,
    user: 'root',
    password: 'root'

});
exports.cnt = connection;