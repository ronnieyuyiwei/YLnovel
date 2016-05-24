/**
 * Created by Yu Yiwei on 2016/5/24.
 */
$(function () {
    $(".register-btn").click(function(){
        var id = $("input.cell").val();
        var password = $("input.password").val();
    $.ajax({
        type:"post",
        dataType:"text",
        url:"/register",
        data: {id2:id,password2:password},
        success: function(Test){
            alert(Test);
        }
    })
});


});