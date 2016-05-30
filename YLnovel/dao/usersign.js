var dbConnect = require("./dbConnect");
var username = "登录";
function set_Username(_username) {
    username = _username;
}
var get_username = function () {
    return username;
}
var register = function (id, password, res) {

    console.log(id);
    dbConnect.cnt.query('Select count(0) as count From user Where id = ?', [id], function (err, result) {
        console.log(result[0].count);
        if (result[0].count == 0) {
            dbConnect.cnt.query('insert into user set ?', {
                id: id,
                password: password
            }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("注册成功")

                }
            })
        } else {
            console.log("用户名重复 注册失败")

        }

    })


};

var login = function (id, password, req, res) {
    dbConnect.cnt.query('Select count(0) as count From user Where id = ?', [id], function (err, result) {
        console.log(result[0].count)
        if (result[0].count != 0) {
            dbConnect.cnt.query('select password from user where id ="' + id + '"', function (err, result) {
                if (result[0].password == password) {
                    console.log("成功" + id);
                    set_Username(id);
                }
            })
        }
    })
};
//

exports.register = register;
exports.login = login;
//exports.results = results;
exports.get_username = get_username;