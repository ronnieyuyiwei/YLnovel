/**
 * Created by Yu Yiwei on 2016/5/30.
 */

var dbConnect = require("./dbConnect");
var indexinfo = {
    story_title:"",
    author:"",
    comments_num:"0",
    zan_num:"0"
};
function setinfo(_title,author,comments_num,zan_num){
    indexinfo.story_title = _title;
    indexinfo.author = author;
    indexinfo.comments_num = comments_num;
    indexinfo.zan_num = zan_num
};
var get_index = function(){
    dbConnect.cnt.query("select * from story",function(err,result){

        setinfo(result[0].title,result[0].author,result[0].comments_num,result[0].zan_num)
    })
}

exports.get_index=get_index;
exports.indexinfo = indexinfo;