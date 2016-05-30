/**
 * Created by Yu Yiwei on 2016/5/29.
 */
var dbConnect = require("./dbConnect");
var add_story = function (title,summary,story,author,classify){
   dbConnect.cnt.query('insert into story set ?',{
       title:title,
       summary:summary,
       story_content1:story,
       author:author,
       classify:classify
   },function(err){

   })
}


exports.add_story = add_story;