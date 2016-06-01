/**
 * Created by Yu Yiwei on 2016/5/24.
 */
$(function () {
    $(".register-btn").click(function(){

        var id = $("input.cell").val();
        var password = $("input.password").val();
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if(!reg.test(id)){
            alert("手机号格式有误")
        }else{
            $.ajax({
                type:"post",
                dataType:"text",
                url:"/register",
                data: {id:id,password:password},
                success: function(test,res) {
                    console.log(test);
                    alert(test);
                    window.location.href = "/login";
                }
            })
        }
});
});
$(function (){
    $(".login-btn").click(function(){

        var id = $("input.id").val();
        var password = $("input.password").val();

            $.ajax({
                type:"post",
                dataType:"text",
                url:"/login",
                data: {id:id,password:password},
                success: function(test){
                   window.location.href="/mypage"
                },
                error:function(){
                    alert("用户名密码错误")
                }
            })
})});