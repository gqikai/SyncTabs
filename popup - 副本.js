var xmlhttp;
function doPost(postUrl,postBody) {

          //确定浏览器
          if(window.XMLHttpRequest) {
                    //针对FireFox、Mozillar、Opera、Safari、IE7、IE8
                    //创建XMLHttpRequest对象
                    xmlhttp = new XMLHttpRequest();
                    //修正某些浏览器的BUG
                    if(xmlhttp.overrideMimeType) {
                              xmlhttp.overrideMimeType("text/html");
                    }
          }else if(window.ActiveXObject){
                    //针对IE5、IE5.5、IE6
                    //这两个为插件名称作为参数传递，为了创建ActiveXObject
                    var activeName = ["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
                    for(var i=0;i>activeName.length();i++) {
                                   try{
                                             //非别取出，如果创建成功则终止循环，如果失败则会抛出异常继续循环
                                             xmlhttp = new ActiveXObject(activeName[i]);
                                             break;
                                   }catch(e){
                                   }
                    }
          }
          //确定XMLHttpRequest是否创建成功
          /*if(!xmlhttp) {
                    alert("XMLHttpRequest创建失败!");
                    return;
          }else {
                    alert("XMLHttpRequest创建成功!"+xmlhttp);
          }*/
          //注册回调函数
          //xmlhttp.onreadystatechange=callback;

          //设置连接信息
          //1.是http请求的方式
          //2.是服务器的地址
          //3.是采用同步还是异步，true为异步
          //xmlhttp.open("GET",url,true);
          //post请求与get请求的区别
          //第一个参数设置成post第二个只写url地址，第三个不变
          xmlhttp.open("POST",postUrl,true);
          //post请求要自己设置请求头
         xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          //发送数据，开始与服务器进行交互
          //post发送请求
  
          
          xmlhttp.send("postBody=" + postBody);
          console.log("Send Successfully");
}

function dealWithAnd(url){
		var reg=new RegExp("&","g"); //创建正则RegExp对象  
var stringObj=url;  
var newStr=stringObj.replace(reg,"**********");  
return newStr
	}


(function(){
	var $=function(id){return document.getElementById(id);}
	var Tasks = {
		//存储dom
		$syncButton:$('syncButton'),
		$registButton:$('registButton'),
		$loginButton:$('loginButton'),
		$msgDiv:$('msgDiv'),
		$registDiv:$('registDiv'),
		$loginDiv:$('loginDiv'),
		$loginSubmit:$('loginSubmit'),
		$registSubmit:$('registSubmit'),
		
		//初始化
		init:function(){
			//设置隐藏
			hideAll();
			
			/*注册事件*/
			Tasks.$registButton.addEventListener('click',function(){
				hideAll();
				Tasks.$registDiv.style.display="inline";
			},true);
			
			Tasks.$loginButton.addEventListener('click',function(){
				hideAll();
				Tasks.$loginDiv.style.display="inline";
			},true);
			
			Tasks.$syncButton.addEventListener('click',function(){
				hideAll();
				chrome.tabs.query({currentWindow: true}, function(tabs){
					
					var xhr = new XMLHttpRequest();
    			xhr.onreadystatechange = function(){
	        console.log(xhr.readyState);
	        if(xhr.readyState == 4){
	        	hideAll();
	        	//Tasks.$msgDiv.style.display="inline";
	        	document.getElementById('msgDiv').innerHTML = xhr.responseText;
	        	alert(xhr.responseText);
	        	console.log("adfas");
	        }
    		}
    		xhr.open("post",'http://localhost/2ndphp/MainController.php',false);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			  xhr.setRequestHeader("Accept","*/*");
			  xhr.setRequestHeader("Accept-Language","zh-CN,zh;q=0.8,en;q=0.6");
			
			  xhr.send("username="+document.getElementById("registUsername").value+
			  "&password="+document.getElementById("registPassword").value+
			  "&email="+document.getElementById("email").value+
			  "&method=regist"
			  );
			},true);
			
			
					var allUrl = new Array();	
					var allTitle = new Array();
	    		for(var i =0; i < tabs.length; i ++){
						allUrl.push(tabs[i].url);
						allTitle.push(tabs[i].title);
						}
					var postUrl = "http://www.qikai.win/index.php";
					var reg=new RegExp("&","g"); //创建正则RegExp对象  
					var stringObj=allUrl.toJSONString() + "aaaaaaaaaa" + allTitle.toJSONString();  
					var postBody=stringObj.replace(reg,"**********");
					console.log(postBody);
					doPost(postUrl,postBody);
				});
			},true);
			
			Tasks.$registSubmit.addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
    		xhr.onreadystatechange = function(){
	        console.log(xhr.readyState);
	        if(xhr.readyState == 4){
	        	hideAll();
	        	//Tasks.$msgDiv.style.display="inline";
	        	document.getElementById('msgDiv').innerHTML = xhr.responseText;
	        	alert(xhr.responseText);
	        	console.log("adfas");
	        }
    		}
    		xhr.open("post",'http://localhost/2ndphp/MainController.php',false);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			  xhr.setRequestHeader("Accept","*/*");
			  xhr.setRequestHeader("Accept-Language","zh-CN,zh;q=0.8,en;q=0.6");
			
			  xhr.send("username="+document.getElementById("registUsername").value+
			  "&password="+document.getElementById("registPassword").value+
			  "&email="+document.getElementById("email").value+
			  "&method=regist"
			  );
			},true);
			
			Tasks.$loginSubmit.addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
    		xhr.onreadystatechange = function(){
	        console.log(xhr.readyState);
	        if(xhr.readyState == 4){
	        	hideAll();
	        	Tasks.$msgDiv.style.display="inline";
	        	document.getElementById('msgDiv').innerHTML = xhr.responseText;
	        	alert(xhr.responseText);
	        }
    		}
    		xhr.open("post",'http://localhost/2ndphp/MainController.php',false);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			  xhr.setRequestHeader("Accept","*/*");
			  xhr.setRequestHeader("Accept-Language","zh-CN,zh;q=0.8,en;q=0.6");
			
			  xhr.send("username="+document.getElementById("loginUsername").value+
			  "&password="+document.getElementById("loginPassword").value+
			  "&email="+document.getElementById("email").value+
			  "&method=login"
			  );
			},true);
		},
	}
		function hideAll(){
		Tasks.$loginDiv.style.display="none";
		Tasks.$registDiv.style.display="none";
		Tasks.$msgDiv.style.display="none";
}

	Tasks.init();
})();
