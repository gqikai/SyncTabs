var xmlhttp;
function doPost(postUrl,postBody) {

          //ȷ�������
          if(window.XMLHttpRequest) {
                    //���FireFox��Mozillar��Opera��Safari��IE7��IE8
                    //����XMLHttpRequest����
                    xmlhttp = new XMLHttpRequest();
                    //����ĳЩ�������BUG
                    if(xmlhttp.overrideMimeType) {
                              xmlhttp.overrideMimeType("text/html");
                    }
          }else if(window.ActiveXObject){
                    //���IE5��IE5.5��IE6
                    //������Ϊ���������Ϊ�������ݣ�Ϊ�˴���ActiveXObject
                    var activeName = ["MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
                    for(var i=0;i>activeName.length();i++) {
                                   try{
                                             //�Ǳ�ȡ������������ɹ�����ֹѭ�������ʧ������׳��쳣����ѭ��
                                             xmlhttp = new ActiveXObject(activeName[i]);
                                             break;
                                   }catch(e){
                                   }
                    }
          }
          //ȷ��XMLHttpRequest�Ƿ񴴽��ɹ�
          /*if(!xmlhttp) {
                    alert("XMLHttpRequest����ʧ��!");
                    return;
          }else {
                    alert("XMLHttpRequest�����ɹ�!"+xmlhttp);
          }*/
          //ע��ص�����
          //xmlhttp.onreadystatechange=callback;

          //����������Ϣ
          //1.��http����ķ�ʽ
          //2.�Ƿ������ĵ�ַ
          //3.�ǲ���ͬ�������첽��trueΪ�첽
          //xmlhttp.open("GET",url,true);
          //post������get���������
          //��һ���������ó�post�ڶ���ֻдurl��ַ������������
          xmlhttp.open("POST",postUrl,true);
          //post����Ҫ�Լ���������ͷ
         xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          //�������ݣ���ʼ����������н���
          //post��������
  
          
          xmlhttp.send("postBody=" + postBody);
          console.log("Send Successfully");
}

function dealWithAnd(url){
		var reg=new RegExp("&","g"); //��������RegExp����  
var stringObj=url;  
var newStr=stringObj.replace(reg,"**********");  
return newStr
	}


(function(){
	var $=function(id){return document.getElementById(id);}
	var Tasks = {
		//�洢dom
		$syncButton:$('syncButton'),
		$registButton:$('registButton'),
		$loginButton:$('loginButton'),
		$msgDiv:$('msgDiv'),
		$registDiv:$('registDiv'),
		$loginDiv:$('loginDiv'),
		$loginSubmit:$('loginSubmit'),
		$registSubmit:$('registSubmit'),
		
		//��ʼ��
		init:function(){
			//��������
			hideAll();
			
			/*ע���¼�*/
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
					var reg=new RegExp("&","g"); //��������RegExp����  
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
