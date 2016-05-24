/**
 * Created by Yu Yiwei on 2016/5/24.
 */
var dbConnect = require("./dbConnect");
var register = function(id,password,res){
    console.log("fffffffffffffffffffffffllala "+id);
    dbConnect.cnt.query('insert into user set ?',{
        id :id ,
        password :password
    },function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log("插入成功");
                   }
    })}

exports.register = register;