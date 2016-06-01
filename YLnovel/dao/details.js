/**
 * Created by Yu Yiwei on 2016/5/31.
 */
var dbConnect = require("./dbConnect");
var detailsinfo = {
    story_title:"",
    focus:"0",
    branch:"0",
    zan_num:"0",
    author:"",
    summary:"",
    content:"",
    content2:"",
    content3:""
};
var setinfo = function(story_title,focus,branch,zan_num,author,summary,content,content2,content3 ){
    detailsinfo.story_title = story_title;
    detailsinfo.focus = focus;
    detailsinfo.branch = branch;
    detailsinfo.zan_num = zan_num;
    detailsinfo.author = author;
    detailsinfo.summary = summary;
    detailsinfo.content = content;
    detailsinfo.content2 = content2;
    detailsinfo.content3 = content3;
};
var getinfo = function(){
    dbConnect.cnt.query("select * from story",function(err,result){

        setinfo(result[0].title,result[0].focus_num,result[0].branch_num,result[0].zan_num,result[0].author,result[0].summary,result[0].story_content1,result[0].story_content2,result[0].story_content3)
    })
};
exports.getinfo = getinfo;
exports.detailsinfo = detailsinfo;