

$(function () {

    //获取当前打开的标签页,显示在#tabList中
    (function getTitleAndUrl(){
        chrome.tabs.query({currentWindow: true}, function(tabs){
            var allUrl = new Array();
            var allTitle = new Array();
            for(var i =0; i < tabs.length; i ++){
                allUrl.push(tabs[i].url);
                allTitle.push(tabs[i].title);

                var $listItem = $("<li></li>");
                var $div = $("<div></div>");
                $div.attr("class","tab_info");
                var $img = $("<img>");
                $img.attr("src",tabs[i].favIconUrl);
                var $childDiv = $("<div></div>");
                var $a = $("<a></a>");
                $a.html(tabs[i].title);
                $a.attr("class","title");
                $a.attr("href",tabs[i].url);
                var $p = $("<p></p>");
                $p.html(tabs[i].url);


                $childDiv.append($a);
                $childDiv.append($p);
                $div.append($img);
                $div.append($childDiv);
                $listItem.append($div);

                $("#tabList").append($listItem);
            }


            $("#loginForm").attr("action","##");

            var reg=new RegExp("&","g"); //��������RegExp����
            var stringObj=allUrl.toJSONString() + "aaaaaaaaaa" + allTitle.toJSONString();
            var titleAndUrl=stringObj.replace(reg,"**********");
            localStorage.str = titleAndUrl;
            console.log(titleAndUrl);
        });
    })();

    //检查注册用户名 密码 验证码
    (function (){
        $("#regist_name").blur(function(){
            if($("#regist_name").val() == ""){
                $("#regist_name_msg").text("please input username");
            }else{
                $.ajax({
                    url:"http://localhost/think/flyingtabs/go/index.php/User/checkUsername",
                    data:"user_name=" + $("#regist_name").val(),
                    type:'post',
                    success:function(msg) {
                        $("#regist_name_msg").text(msg);
                    }
                })
            }
        });

        $("#regist_pass").blur(function(){
            if($("#regist_pass").val() == ""){
                $("#regist_pass_msg").text("please input password");
            }else{
                $("#regist_pass_msg").text("");
            }
        });

        $("#regist_pass2").blur(function(){
            if($("#regist_pass2").val() == ""){
                $("#regist_pass2_msg").text("please input password again");
            }else if($("#regist_pass2").val() != $("#regist_pass").val()){
                $("#regist_pass2_msg").text("not same password");
            }else {
                $("#regist_pass2_msg").text("");
            }
        });

        $("#captcha").blur(function(){
            if($("#captcha").val() == ""){
                $("#regist_captcha_msg").text("please input captcha");
            }else{
                $("#regist_captcha_msg").text("");
            }
        });

    })();

    //检查登录用户名密码
    (function () {
        $("#login_name").blur(function(){
            if($("#login_name").val() == ""){
                $("#login_name_msg").text("please input username");
            }else{
                $("#login_name_msg").text("");
            }
        });

        $("#login_pass").blur(function(){
            if($("#login_pass").val() == ""){
                $("#login_pass_msg").text("please input password");
            }else{
                $("#login_pass_msg").text("");
            }
        });
    })();

    //绑定注册/登录/同步事件
    (function () {
        $("#syncButton").bind('click',function(){
            $("#registForm").css("display","block");
            if(localStorage.username != ''){

                $.ajax({
                    url:"http://localhost/think/flyingtabs/go/index.php/Tab/sync",
                    data:
                    "user_name=" + localStorage.username +"&titleAndUrl=" + localStorage.str,
                    dataType:'text',
                    //async:false,
                    type:'post',
                    success:function(msg){
                        alert(msg);
                    },
                });
            }else{
                alert('please login');
            }
        });

        $("#registButton").bind('click',function(){
            $.ajax({
                url:"http://localhost/think/flyingtabs/go/index.php/User/regist",
                data:
                "user_name=" + $("#regist_name").val() +
                "&user_pass=" + $("#regist_pass").val() +
                "&user_pass2=" + $("#regist_pass2").val() +
                "&email=" + $("#email").val() +
                "&captcha=" + $("#captcha").val()
                ,
                dataType:'text',
                async:false,
                type:'post',
                success:function(msg){
                    //alert(msg);
                    if (msg == "regist succeed") {
                        localStorage.username = $("#regist_name").val();
                        $("#username").text(localStorage.username);
                        $("#beforeLogin").css("display","none");
                        $("#afterLogin").css("display","block");
                        //alert(localStorage.username);

                    }
                },
            });
        });

        $("#loginButton").bind('click',function(){
            $.ajax({
                url:"http://localhost/think/flyingtabs/go/index.php/User/login",
                data:
                "user_name=" + $("#login_name").val() +
                "&user_pass=" + $("#login_pass").val()
                ,
                dataType:'text',
                async:false,
                type:'post',
                success:function(msg){

                    if(msg == 'login succeed!'){
                        localStorage.username = $("#regist_name").val();
                        $("#username").text(localStorage.username);
                        $('.login').hide();
                        $('.regist').hide();
                        $('.sync').show();
                    }
                },
            });
        });

    })();

    $('.regist').hide();
    $('.sync').hide();
});











