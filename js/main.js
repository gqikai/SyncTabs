/**
 * Created by gaoqikai on 16/2/28.
 */

$(document).ready(function(){

    $('#loginButton').click(function(){

                $.post("http://localhost/app/MainController.php", {
                        username :  $("#loginUsername").val() ,
                        content :  $("#loginPassword").val() ,
                        method : "lgoin"
                    }, function (data, textStatus){
                        console.log(data);
                    }
                );

    });
    //
    //$('#registButton').click(function(){
    //    $('.regist').css("display","none");
    //    $('.sync').css("display","block");
    //});

    //$('#toRegist').click(function(){
    //    $('.login').css("display","none");
    //    $('.regist').css("display","block");
    //});

    $("#registForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
        },

        messages: {
            username: {
                required: '请输入姓名',
                minlength: '请至少输入两个字符'
            },
            email: {
                required: '请输入电子邮件',
                email: '请检查电子邮件的格式'
            },
        },

        errorElement: "em", //可以用其他标签，记住把样式也对应修改
        success: function(label) {
            //label指向上面那个错误提示信息标签em
            label.text(" ")				//清空错误提示消息
                .addClass("success");	//加上自定义的success类
        }

    });

});
