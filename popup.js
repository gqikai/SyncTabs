
(function(){
	var $=function(id){return document.getElementById(id);}
	var Tasks = {
		//存储dom
		$syncButton:$('syncButton'),
		$registButton:$('registButton'),
		$loginButton:$('loginButton'),
		//$usernameButton:$('usernameButton'),
		$msgDiv:$('msgDiv'),
		$registDiv:$('registDiv'),
		$loginDiv:$('loginDiv'),
		$loginSubmit:$('loginSubmit'),
		$registSubmit:$('registSubmit'),
		
		//初始化
		init:function(){
			//设置隐藏
			hideAll();
			Tasks.$msgDiv.style.display="inline";
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
				if(localStorage.username == 'null'){
					alert("输入用户名");
					}else{
						//alert(localStorage.username);
											hideAll();
					var xhr = new XMLHttpRequest();
	    		xhr.onreadystatechange = function(){
		        console.log(xhr.readyState);
		        if(xhr.readyState == 4){
		        	hideAll();
		        	alert("同步成功");
		        	//console.log("adfas");
		        }
	    		}
	    		xhr.open("post",'http://localhost/2ndphp//MainController.php',false);
					xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				  xhr.setRequestHeader("Accept","*/*");
				  xhr.setRequestHeader("Accept-Language","zh-CN,zh;q=0.8,en;q=0.6");
				
					chrome.tabs.query({currentWindow: true}, function(tabs){
						var allUrl = new Array();	
						var allTitle = new Array();
		    		for(var i =0; i < tabs.length; i ++){
							allUrl.push(tabs[i].url);
							allTitle.push(tabs[i].title);
							}
						var reg=new RegExp("&","g"); //创建正则RegExp对象  
						var stringObj=allUrl.toJSONString() + "aaaaaaaaaa" + allTitle.toJSONString();  
						var postBody=stringObj.replace(reg,"**********");
						console.log(postBody);
	
				  xhr.send("username=" + localStorage.username + "&method=sync&postBody="+postBody);
				});
						}

		},true);
				
			
			Tasks.$registSubmit.addEventListener('click',function(){
				var xhr = new XMLHttpRequest();
    		xhr.onreadystatechange = function(){
	        console.log(xhr.readyState);
	        if(xhr.readyState == 4){
	        	hideAll();
	        	//Tasks.$msgDiv.style.display="inline";
	        	document.getElementById('msgDiv').innerHTML = xhr.responseText;
	        	//alert(xhr.responseText);
	        	if (xhr.responseText == "registSucceed") {
	        		localStorage.username = document.getElementById("registUsername").value;
	        		//document.getElementById('urlText').value = "qikai.win/" + localStorage.username + ".html";
	        		alert("注册成功");
	        	}else{
	        		alert("注册失败，用户名已存在");
	        		}
	        }
    		}
    		xhr.open("post",'http://localhost/2ndphp//MainController.php',false);
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
	        	//alert(xhr.responseText);
	        	if (xhr.responseText == "loginSucceed") {
	        		localStorage.username = document.getElementById("loginUsername").value;
	        		//document.getElementById('urlText').value = "qikai.win/" + localStorage.username + ".html";
	        		alert("登录成功");
	        	}else{
	        		alert("登录失败，请检查用户名和密");
	        		}
	        }
    		}
    		xhr.open("post",'http://localhost/2ndphp//MainController.php',false);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			  xhr.setRequestHeader("Accept","*/*");
			  xhr.setRequestHeader("Accept-Language","zh-CN,zh;q=0.8,en;q=0.6");
			
			  xhr.send("username="+document.getElementById("loginUsername").value+
			  "&password="+document.getElementById("loginPassword").value+
			  "&method=login"
			  );
			},true);
			//alert(localStorage.username);
			if(localStorage.username != 'null' && localStorage.username != 'undefined'){
				document.getElementById('usernameText').innerHTML = localStorage.username + "（已登录）";
				document.getElementById('urlText').innerHTML = "qikai.win/" + localStorage.username + ".html";
				//var tr = document.getElementById('usernameButton');
				//tr.parentNode.removeChild(tr);
				}
			
			
		},
	}
		function hideAll(){
		Tasks.$loginDiv.style.display="none";
		Tasks.$registDiv.style.display="none";
//		Tasks.$msgDiv.style.display="none";
}

		function setUsernameAndUrl(){

}

	Tasks.init();
})();
