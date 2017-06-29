//版本号：第三次迭代，1.3；author：Jimmy
//time:2017-3-7
(function(w){
	var JM={}
    JM.version=1.3
    w.JM=JM
    JM.baseUrl="http://10.0.0.170:9191/mockjsdata/66"
    JM.downloadUrl="http://pic.flaginfo.cn/"	
  //  JM.baseUrl2="../../.."
    JM.loginUrl="../../"	
    JM.uploadUrl="http://pic.test.ums86.com/"	
    //用JS捕获语法错误,window.onerror=JM.fnErrorTrap调用
    JM.fnErrorTrap=function(sMsg, sUrl, sLine){
    	var txt = "An error was thrown and caught;\n";
		txt += "Error: " + sMsg + ";\n";
		txt += "Line: " + sLine + ";\n";
		txt += "URL: " + sUrl;
		alert(txt)
    }
    
    //正则验证↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    //参数a为要进行验证的值，b为输入框的class或id
    JM.testCode=function(){
		$("input,textarea,select").on("focusin",function(){
			$(this).next("span.JM_errortips").remove()
			$(this).css({"border":"1px solid #dcdcdc","color":"#333333"})
		})
    }
    JM.testCode.prototype={
    	errorPosition:function(b){
    		var offsetTop=$(b).offset().top-50
			console.log(offsetTop)
			$(window).scrollTop(offsetTop)
    	},	
    	mobile:function(a,b){   
    		var code= /^1\d{10}$/
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>请输入正确的手机号码</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	  },
    	unvalid:function(a,b,text){
    		var code=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
    		if(code.test(a)==false){
    			$(b).css({"border":"1px solid #f54336","color":"#f54336"})
    			$(b).after("<span class='JM_errortips'>"+text+"</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	localPhone:function(a,b){
    		var code=/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
    			if(code.test(a)==false){
        			$(b).css({"border":"1px solid #f54336","color":"#f54336"})
        			$(b).after("<span class='JM_errortips'>请输入正确座机号</span>")
        			this.errorPosition(b)
        			return code.test(a)
        		}else{
        			return code.test(a)
        		}
    	},
    	notSpace:function(a,b,text){
    		if(a.length==""){
    			$(b).css({"border":"1px solid #f54336","color":"#f54336"})
    			$(b).after("<span class='JM_errortips'>"+text+"</span>")
    			this.errorPosition(b)
    			return false
    		}else{
    			return true
    		}
    	},
    	number:function(a,b){
    		var code=/^-?\d+$/
    		if(code.test(a)==false){
    			$(b).css("border","1px solid #f54336")
    			$(b).after("<span class='JM_errortips'>只能是数字</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	  },
    	chinese:function(a,b){
    		var code=/[\u4e00-\u9fa5]/gm
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>只能是中文</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	ID:function(a,b,text){//只能由英文数字下划线--账号
    		var code=/^\w+$/
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>"+text+"</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	password:function(a,b){//只能由英文数字下划线
    		var code=/^\w+$/
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>密码只能包含英文、数字、下划线</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	email:function(a,b){
    		var code=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>请输入正确的邮箱格式</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	IDcard:function(a,b){//匹配身份证
    		var code=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    	    if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>请输入正确的身份证号</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	date:function(a,b){//日期格式为YY-MM-DD
    		var code=/^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>日期格式不正确</span>")
    			this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	},
    	http:function(a,b){//网址格式
    		var code=/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
    		if(code.test(a)==false){
    			$(b).css("border","1px solid red")
    			$(b).after("<span class='JM_errortips'>请输入正确格式的链接</span>")
    			$this.errorPosition(b)
    			return code.test(a)
    		}else{
    			return code.test(a)
    		}
    	}
    }
     //正则验证↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
     
     //提示框组↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
     JM.tips=function(){}
     JM.tips.prototype={
     	autoHide:function(text){//会自己消失的提示框
     		    var html=""
         		html+="<div class='JM_tipsAlert'><header>提示</header>"
         		html+="<section class='JM_alert'> <i class='ep ep-warning'></i><p style='line-height:60px'>"+text+"</p></section>"
         		html+="<footer><button class='JM_btnMiddle warning sure'>关闭</button></footer></div><div class='JM_cover'></div>"
         		var obj=$(html)
         		if($(".JM_tipsAlert").length==0){
         			$("body").append(obj)
             		$(".JM_tipsAlert").velocity({"top":"50%"},300)
             		$(".JM_tipsAlert footer .sure").click(function(){
             			$(".JM_tipsAlert").velocity({"top":"-50%"},300,function(){
             				obj.remove()
             			})
             		})
         		}
         		
     	},
     	deleteComfirm:function(text,pdata,url,error,callback){//选择取消和确定的删除提示框
     		 var that=this
     		 var html=""
     		 html+="<div class='JM_tipsConfirm'><header>提示<span></span></header>"
     		 html+="<section class='body'>"+text+"</section>"
     		 html+="<footer><button class='JM_btnSmall warning sure'>确定</button><button class='JM_btnSmall default cancel'>取消</button></footer></div>"
     		 html+="<div class='JM_cover'></div>"
     		 var obj=$(html)
     		 $("body").append(obj)
     		 $(".JM_tipsConfirm").velocity({"top":"50%"},300)
     		$(".JM_tipsConfirm header span,.JM_tipsConfirm footer .cancel").click(function(){
     			$(".JM_tipsConfirm").velocity({"top":"55%"},300,function(){
             				obj.remove()
             	})
     		})
     		if(url!=undefined){
	 			$(".JM_tipsConfirm footer .sure").click(function(){
	 			  $.ajax({
	 			  	type:"post",
	 			  	url:url,
	 			  	data:pdata,
	 			  	dataType:"json",
	 			  	async:true,
	 			  	success:function(data){
	 			  		if(data.head.resultCode==200){
	 			  			//location.reload()
	 			  			if(typeof callback=="function"){
	 			  				callback()
	 			  			}
	 			  			$(".JM_tipsConfirm").velocity({"top":"55%"},300,function(){
	             				obj.remove()
	             	        })
	 			  		}else{
	 			  			that.autoHide(error)
	 			  		}
	 			  	},
	 			  	error:function(){
	 			  		that.autoHide(error)
	 			  	}
	 			  });
	 		    })
     		}
     	},
     	alert:function(text){
     		var html=""
     		html+="<div class='JM_tipsAlert'><header>提示</header>"
     		html+="<section>"+text+"</section>"
     		html+="<footer><button class='JM_btnMiddle warning sure'>确定</button></footer></div><div class='JM_cover'></div>"
     		var obj=$(html)
     		$("body").append(obj)
     		$(".JM_tipsAlert").velocity({"top":"50%"},300)
     		$(".JM_tipsAlert footer .sure").click(function(){
     			$(".JM_tipsAlert").velocity({"top":"-50%"},300,function(){
     				obj.remove()
     			})
     		})
     		
     	},
     	alertChose:function(text,callback){
     		var html=""
     		html+="<div class='JM_tipsAlert'><header>提示</header>"
     		html+="<section>"+text+"</section>"
     		html+="<footer><button class='JM_btnSmall warning sure'style='margin-right:5px'>确定</button><button class='JM_btnSmall default cancel'>取消</button></footer></div><div class='JM_cover'></div>"
     		var obj=$(html)
     		$("body").append(obj)
     		$(".JM_tipsAlert").velocity({"top":"50%"},300)
     		$(".JM_tipsAlert footer .sure").click(function(){
     			$(".JM_tipsAlert").velocity({"top":"-50%"},300,function(){
     				obj.remove()
     				if(typeof callback=="function"){
     					callback()
     				}
     			})
     		})
     		$(".JM_tipsAlert footer .cancel").click(function(){
     			$(".JM_tipsAlert").velocity({"top":"-50%"},300,function(){
     				obj.remove()
     			})
     		})
     	}
     }
     //提示框组↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
     
   
     
     //h5图片上传↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
      JM.uploadH5=function(data){
      	//this._div=div
      	this._size=data==undefined?3:(data.size==undefined?3:data.size)
      	this._radio=data==undefined?1:(data.radio==undefined?1:data.radio)
      }
     JM.uploadH5.prototype={
     	init:function(){
     		    if(typeof this._size!="number"||typeof this._radio!="number"){
     		    	alert("参数错误")
     		    	return
     		    }
     		    var html="<div class='JM_cover'></div>"
             	html+="<div class='JM_picBox'><header>上传<span></span></header>"
             	html+="<section><div class='JM_imgBox'><canvas id='cutImg'></canvas></div><input type='file'name='file'id='JM_upload'style='hidden'/><span class='JM_addImg'>添加图片+</span></section>"
             	html+="<footer><button class='JM_btnMiddle primary'>裁剪</button><button class='JM_btnMiddle danger'disabled style='opacity:0.5'>上传</button></footer></div>"
                var obj=$(html)  
                $("body").append(obj)
                $(".JM_picBox header span").on("click",function(){
                	obj.remove()
                })
     		if(typeof FileReader=="undefined"){
     			 $(".JM_picBox").html("<p>你的浏览器不支持FileReader接口！</p>")
			    //使选择控件不可操作  
			     file.setAttribute("disabled","disabled"); 
     		}else{
     			this.readStart()
     		} 
     	},
     	readStart:function(){
     		  //var div=this._div
     		  var that=this
     		  var size=this._size
     		  $("span.JM_addImg").on("click",function(){
     		  	$("#JM_upload").click()
     		  })
     		  $("#JM_upload").bind("change",function(){
     		  	 var file=document.getElementById("JM_upload").files[0]//获取上传的信息
     		  	 console.log(file)
     		  	 if(!/image\/\w+/.test(file.type)){//验证是否为图片
     		  	 	alert("请上传图片")
     		  	 	return false
     		  	 }
     		  	 var sizeFile=file.size/(1024*1024)
     		  	 if(sizeFile>size){
     		  	 	alert("图片不能大于'"+size+"'M")
     		  	 	return false
     		  	 }
     		  	 that.read(file)
     		  })
     	},
     	read:function(file){
     		 var radio=this._radio
     		 var canvasWidth
     		 var canvasHeight
     		 var reader=new FileReader()
     		  //将文件以Data URL形式读入页面  
     		 var that=this
             reader.readAsDataURL(file)
             reader.onload=function(e){
             	console.log(this)
             	var img=new Image()
             	img.src=this.result
             	that._img=this.result
             	var canvas=document.getElementById("cutImg")
     			var context=canvas.getContext("2d")
             	$(".JM_imgBox").find("img").remove()
             	$(".JM_imgBox").append(img)
             	that._trueWidth=img.width
             	that._trueHeight=img.height
             	var imgboxWidth=$(".JM_imgBox").width()
             	if(img.width<imgboxWidth){
             		$(".JM_imgBox").find("img").css("width",img.width)
             	}else{
             		$(".JM_imgBox").find("img").css("width","100%")
             	}
             	
             	//判断图片显示出来的大小
                var imgWidth=$(".JM_imgBox").find("img").width()
                var imgHeight=$(".JM_imgBox").find("img").height()
             	if(imgWidth>imgHeight){
             		 canvasWidth=imgHeight*0.95
             		 canvasHeight=canvasWidth/radio
             	}
             	if(imgWidth<=imgHeight){
             		canvasWidth=imgWidth*0.95
             		canvasHeight=canvasWidth/radio
             	}
             	$("#cutImg").attr({"width":canvasWidth,"height":canvasHeight})
             	$("#cutImg").css("display","block")
     			context.clearRect(0,0,canvasWidth,canvasHeight)
             	that.drag("#cutImg",canvasWidth,canvasHeight)
             }
            
     	},
     	drag:function(canvas,sx,sy){
     		var mouse="up"
     		var downX
     		var downY
     		var moveX
     		var moveY
     		var left
     		var top
     		var that=this
     		$(canvas).on("mousedown",function(e){
     			mouse="down"
     			$(".JM_picBox footer button:last").attr("disabled",true)
     			$(".JM_picBox footer button:last").css("opacity",0.5)
     			var event=window.event||e
     			downX=event.clientX
     			downY=event.clientY
     			var canvas=document.getElementById("cutImg")
     			var context=canvas.getContext("2d")
     			context.clearRect(0,0,sx,sy)
     			$(".JM_imgBox").find("img").css("opacity",1)
     			left=$(".JM_picBox").find("canvas").offset().left-$(".JM_imgBox").offset().left
             	top=$(".JM_picBox").find("canvas").offset().top-$(".JM_imgBox").offset().top
     		})
     		$(canvas).on("mousemove",function(e){
     			var event=window.event||e
     			if(mouse=="down"){
     				moveX=event.clientX
     				moveY=event.clientY
     				var X=moveX-downX
     				var Y=moveY-downY
     				var width=$(this).width()
     				var height=$(this).height()
     				var imgWidth=$(".JM_imgBox img").width()
     				var imgHeight=$(".JM_imgBox img").height()
     				console.log(imgHeight)
     				$(this).css({
     					"top":(Y+top)<=0?0:((Y+top+height)>=imgHeight?(imgHeight-height-2):(Y+top)),
     					"left":(X+left)<=0?0:((X+left+width)>=imgWidth?(imgWidth-width-2):(X+left))
     				})
     			}
     		})
     		$(canvas).on("mouseup",function(){
     			mouse="up"
     		})
     		$(canvas).on("mouseout",function(){
     			mouse="up"
     		})
     		this.cut(sx,sy)
     	},
     	cut:function(sx,sy){
     		var that=this
     		$("body").on("click",".JM_picBox footer button:first",function(){
     			var canvas=document.getElementById("cutImg")
     			var context=canvas.getContext("2d")
     			var img=$(".JM_imgBox").find("img").get(0)
     			var radioX=that._trueWidth/img.width
     			var radioY=that._trueHeight/img.height
     			console.log(radioX,radioY)
     			var newX=$('#cutImg').position().left
     			var newY=$('#cutImg').position().top
     			
     			console.log(sx,sy)
     			context.drawImage(img,newX*radioX,newY*radioY,sx*radioX,sy*radioY,0,0,sx,sy)
     			$(".JM_imgBox").find("img").css("opacity",0.5)
     			that._cuted=true
     			$(this).next().attr("disabled",false)
     			$(this).next().css("opacity",1)
     			that.upload()
     		})
     	},
     	upload:function(){
     		$(".JM_picBox footer button:last").unbind("click").bind("click",function(){
     			var can=document.getElementById("cutImg")
     			var data=can.toDataURL();
     			console.log(data)
	            
	           
	     })
     	}
     }
     //h5图片上传↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
     
     //模板引擎渲染↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
     JM.render=function(){}
     JM.render.prototype={
     	init:function(data){
     		this._data=data
     		console.log(data)
     		if(data.id==undefined||data.id==""){
     			return false
     		}
     		if(data.data==undefined||data.data==""){
     			return false
     		}
     		if(data.ele==undefined||data.ele==""){
     			return false
     		}
     		this.model()
     	},
     	model:function(){
     		var data=this._data
     		var id=data.id//参数id
     		var ele=data.ele//参数dom节点
     		var model=$(id).find(ele).last()//找到需要渲染的html结构
			var attrKey=model.attr("JM-for").split("in")[0].replace(/\s/g,"")//获取key
			var attrVal=model.attr("JM-for").split("in")[1].replace(/\s/g,"")//获取value
     		var items=data.data[attrVal]//如果传入参数格式不正确，返回false
     		if(!items){
     			return false
     		}
     		var html=model.get(0).outerHTML
     		model.get(0).outerHTML=""
     		var render="" 
     		for (var i=0;i<items.length;i++){
     			render+=html.replace(/\{\{(.+?)\}\}/g,function(res1,res2){//通过正则匹配替换{{}}里的内容
     				console.log(res1,res2)
     				if(res2.split(".")[0]==attrKey){
     					return items[i][res2.split(".")[1]]
     				}else{
     					return res1
     				}
     			})
     		}
     		//console.log(render)
     		var objRender=$(render)//需要渲染的模板
     		var objHtml=$(html)
     		this.view(objRender,objHtml)
     	},
     	view:function(objRender,objHtml){
     		var callBack=this._data.callBack
     		var id=this._data.id
     		var ele=this._data.ele
     		$(id).append(objRender)
     		$(id).append(objHtml)
     		$(id).find(ele).show()
     		$(id).find(ele).last().hide()
     		if(typeof callBack=="function"){
     			callBack()
     		}
     	}
     }
     //模板引擎渲染↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
     
     //分页↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
     JM.setPage=function(url,data,pagebox){//url为请求路径，data为提交参数，pagebox为分页需要渲染的div
     	 this._url=url
	     this._data=data
	     this._pagebox=pagebox
     }
    
		JM.setPage.prototype={
			init:function(callback){
				var data=this._data
				this._callBack=callback
				this.getData(data,callback)
			},
			getData:function(data,callback){//需要根据真实接口修改
				var url=this._url
				var that=this
				var pagebox=this._pagebox
				//console.log(data);
				var arrValue=[]
				for(var key in data){
					arrValue.push(data[key])
				}
				var nowPage=arrValue[0]
				var count= arrValue[1]
				console.log(data)
				$(".JMpage_search").find("input").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						data[name]=value
					})
				$(".JMpage_search").find("select").each(function(){
					var name=$(this).attr("name")
					var value=$(this).val()
					data[name]=value
				})
				$.ajax({
					type:"post",
					url:url,
					dataType:"json",
					data:data,
					async:true,
					success:function(data){
						//console.log(data);
						if(data.head.resultCode==200){
							var json=data.body
							//console.log(json)
						    var totalPage=json.totalCount
							//var totalPage=10
							var totalNum=json.pageCount
							//alert(totalNum)
							/*if(totalNum==0){
								$(pagebox).html("<div class='JM_setPage'><p class='errorTips'>无相关数据...</p></div>")
								return
							}*/
							if(totalPage==0){
								$(pagebox).html("")
							}
							console.log(totalPage,nowPage)
							that.creat(totalPage,nowPage,count,totalNum)
							if(typeof callback!="function"){
								return false
							}else{
								callback(json)
							}
						}else{
							$(pagebox).html("<div class='JM_setPage'><p class='errorTips'>出错啦...</p></div>")
						}
						
					},
					error:function(data){
						//that.creat(allPage,nowPage,count)
						$(pagebox).html("<div class='JM_setPage'><p class='errorTips'>出错啦...</p></div>")
						if(typeof callback!="function"){
							return false
						}else{
							callback(data)
						}
					}
				});
			},
			creat:function(allPage,nowPage,count,totalRecord){
				var pagebox=this._pagebox
				var html="<div class='JM_setPage'>显示：<select class='pageCount'><option value='10'>10条</option><option value='15'>15条</option><option value='20'>20条</option></select>条&nbsp共<span class='totalNum'>"+totalRecord+"</span>条&nbsp<a class='PageUp'><div class='arrow-left'></div>上一页</a><ul>"
				if(nowPage>allPage){
					console.log("当前页数超过总页数")
					return false
				}
				if(allPage<7){
					for (var i=0;i<allPage;i++) {
						if(i+1==nowPage){
							html+="<li class='pageNumber nowPage'>"+(parseInt(i)+1)+"</li>"
						}else{
							html+="<li class='pageNumber'>"+(parseInt(i)+1)+"</li>"
						}
					}
					html+="</ul><a class='PageDown'>下一页<div class='arrow-right'></div></a>"
				}
				if(allPage>=7&&nowPage>3&&nowPage<allPage-2){
					html+="<li class='pageNumber'>1</li><li class='pageDot'>..</li>"
					html+="<li class='pageNumber'>"+(nowPage-1)+"</li>"
					html+="<li class='pageNumber nowPage'>"+nowPage+"</li>"
					html+="<li class='pageNumber'>"+(parseInt(nowPage)+1)+"</li>"
					html+="<li class='pageDot'>..</li><li class='pageNumber'>"+allPage+"</li>"
					html+="</ul><a class='PageDown'>下一页<div class='arrow-right'></div></a>"
				}else if(allPage>=7&&nowPage<=3){
					if(nowPage==1||nowPage==2){
						for(var i=1;i<=3;i++){
							if(nowPage==i){
								html+="<li class='pageNumber nowPage'>"+i+"</li>"
							}else{
								html+="<li class='pageNumber'>"+i+"</li>"
							}
						}
					}else if(nowPage==3){
						for(var i=1;i<=4;i++){
							if(nowPage==i){
								html+="<li class='pageNumber nowPage'>"+i+"</li>"
							}else{
								html+="<li class='pageNumber'>"+i+"</li>"
							}
						}
					}
					html+="<li class='pageDot'>..</li><li class='pageNumber'>"+allPage+"</li>"
					html+="</ul><a class='PageDown'>下一页<div class='arrow-right'></div></a>"
				}else if(allPage>=7&&nowPage>=allPage-2){
					html+="<li class='pageNumber'>1</li><li class='pageDot'>..</li>"
					if(nowPage==allPage||nowPage==allPage-1){
						for (var i=allPage-2;i<=allPage;i++) {
							if(nowPage==i){
								html+="<li class='pageNumber nowPage'>"+i+"</li>"
							}else{
								html+="<li class='pageNumber'>"+i+"</li>"
							}
						}
						
					}else if(nowPage==allPage-2){
						for (var i=allPage-3;i<=allPage;i++) {
							if(nowPage==i){
								html+="<li class='pageNumber nowPage'>"+i+"</li>"
							}else{
								html+="<li class='pageNumber'>"+i+"</li>"
							}
						}
					}
					html+="</ul><a class='PageDown'>下一页<div class='arrow-right'></div></a>"
				}
				 $(pagebox).html(html)
				 if(allPage==nowPage){
						$(pagebox).find(".PageDown").addClass("disabled")
					}
					if(nowPage==1){
						$(pagebox).find(".PageUp").addClass("disabled")
				    }
					$(pagebox).find(".pageCount option[value='"+count+"']").attr("selected",true)
					this.operation()	
			},
			operation:function(){
					var that=this
					var data=this._data
					var callback=this._callBack
					var pagebox=this._pagebox
					var arrKey=[]
						for(var key in data){
							arrKey.push(key)
						}
					var keyNowpage=arrKey[0]
					var keyCount=arrKey[1]
				$(pagebox).find("li.pageNumber").bind("click",function(){//点击页数
					if($(this).hasClass("nowPage")){
						return false
					}
					var nowPage=$(this).text()
					var count=$(this).parent().prevAll(".pageCount").val()
					nowPage=parseInt(nowPage)
					count=parseInt(count)
					var Json={}
					Json[keyNowpage]=nowPage
					Json[keyCount]=count
					$(".JMpage_search").find("input").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					$(".JMpage_search").find("select").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					//$(pagebox).empty()
					that.getData(Json,callback)
				})
				$(pagebox).find(".PageUp").bind("click",function(e){//点击上一页
					var e=window.e||e
					e.preventDefault()
					if($(this).hasClass("disabled")){
						return
					}
					var nowPage=$(this).next().find("li.nowPage").html()-1
					if(nowPage==0){
						return
					}
					var count=$(this).prevAll(".pageCount").val()
					nowPage=parseInt(nowPage)
					count=parseInt(count)
					var Json={}
					Json[keyNowpage]=nowPage
					Json[keyCount]=count
					$(".JMpage_search").find("input").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					$(".JMpage_search").find("select").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					//$(pagebox).empty()
					that.getData(Json,callback)
				})
				$(pagebox).find(".PageDown").bind("click",function(e){
					var e=window.e||e
					e.preventDefault()
					if($(this).hasClass("disabled")){
						return
					}
					var nowPage=$(this).prev().find("li.nowPage").html()
					nowPage=parseInt(nowPage)+1
					var count=$(this).prevAll(".pageCount").val()
					nowPage=parseInt(nowPage)
					count=parseInt(count)
					var Json={}
					Json[keyNowpage]=nowPage
					Json[keyCount]=count
					$(".JMpage_search").find("input").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					$(".JMpage_search").find("select").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
				//	console.log(Json)
					//$(pagebox).empty()
					that.getData(Json,callback)
				})
				$(pagebox).find("select").bind("change",function(){
					//var nowPage=$(this).prevAll("ul").find("li.nowPage").html()
					var nowPage=1
					var count=$(this).val()
					nowPage=parseInt(nowPage)
					count=parseInt(count)
					//$(pagebox).empty()
					var Json={}
					Json[keyNowpage]=nowPage
					Json[keyCount]=count
					$(".JMpage_search").find("input").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					$(".JMpage_search").find("select").each(function(){
						var name=$(this).attr("name")
						var value=$(this).val()
						Json[name]=value
					})
					//console.log(Json)
					that.getData(Json,callback)
				})
			}
		}
//批量删除或者删除后重新调用分页配置参数↓↓↓↓↓↓↓↓
	JM.deletPageSet=function(deletLength){
				var totalNum=$(".JM_setPage").find("span.totalNum").text()
				var size=$(".JM_setPage").find("select.pageCount").val()
				var nowPage=$(".JM_setPage").find("li.nowPage").text()
				var allpage=Math.ceil(totalNum/size)
				var nowPageDeleted
				if(nowPage==allpage){
					var totalNumDeleted=totalNum-deletLength
					var allPageDeleted=Math.ceil(totalNumDeleted/size)
					if(allPageDeleted<allpage){
						nowPageDeleted=(nowPage-1==0?1:nowPage-1)
						var data=[nowPageDeleted,size]
						return data
					}else{
						var data=[nowPage,size]
						return data
					}
				}else{
					return [nowPage,size]
				}
	}
//批量删除或者删除后重新调用分页配置参数↑↑↑↑↑↑↑↑
//左边菜单栏渲染↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
     JM.leftMenu=function(div){
     	 this._div=div
     }
     JM.leftMenu.prototype={
     	init:function(callback){
     		var div=this._div
     		var html=""
     		html+="<h5 class='requirement'style='display:none'>需求支撑</h5>"
     		html+="<ul class='requirement'style='display:none'><a href='/page/sxlt/requirement/requirementList.html'><li><span>需求列表</span></li></a>"
     	/*	html+="<a href='/page/sxlt/requirement/requireType.html'><li><span>类别管理</span></li></a>"*/
     		html+="</ul>"
     		html+="<h5 class='solveCase'style='display:none'>方案中心</h5>"
     		html+="<ul class='solveCase'style='display:none'><li><a href='/page/sxlt/solveCase/solveCaseList.html'><span>产品方案</span></a></li></ul>"
     		html+="<h5 class='productionManage'style='display:none'>管理中心</h5>"
     	    html+="<ul class='productionManage'style='display:none'><li style='display:none'><a href='/page/sxlt/productionManage/productionList.html'><span>产品管理</span></a></li><li style='display:none'><a href='/page/sxlt/productionManage/mySolveCaseList.html'><span>我的方案</span></a></li></ul>"	
     	    html+="<h5 class='waitDo'style='display:none'>待办事项</h5>"	
     	    html+="<ul class='waitDo'style='display:none'><a href='/page/sxlt/backlogList/requireList.html'><li><span>待办列表</span></li></a></ul>"	
     		$(div).html(html)
     		if(typeof callback=="function"){
     			callback()
     		}
     		this.operation()
     		this.defaultShow()
     	},
     	operation:function(){
     		var div=this._div
     		var that=this
     		//$(div).find("li").addClass("active")
     		$(div).on("click","li",function(){
     			$(div).find("li").removeClass("active")
     			$(this).addClass("active")
     		})
     	},
     	defaultShow:function(){
     		var herf=window.location.href
     		if(herf.indexOf("requirement/requirementList.html")>-1||herf.indexOf("requirement/requirementDetail.html")>-1||herf.indexOf("requirement/addRequirement.html")>-1||
     		    herf.indexOf("requirement/requireEvaluate.html")>-1||herf.indexOf("requirement/taskList.html")>-1	
     		){
     			$(".requirement").find("li").eq(0).addClass("active")
     		}else if(herf.indexOf("solveCase/solveCaseList.html")>-1||herf.indexOf("solveCase/solveCaseDetail.html")>-1){
     			$(".solveCase").find("li").eq(0).addClass("active")
     		}else if(herf.indexOf("productionManage/productionList.html")>-1||herf.indexOf("productionManage/addProduction.html")>-1||herf.indexOf("productionManage/productionCheck.html")>-1||herf.indexOf("productionManage/productionDetail.html")>-1){
     			$(".productionManage").find("li").eq(0).addClass("active")
     		}else if(herf.indexOf("productionManage/mySolveCaseList.html")>-1||herf.indexOf("productionManage/addMyCase.html")>-1||herf.indexOf("productionManage/mySolveCaseDetail.html")>-1){
     			$(".productionManage").find("li").eq(1).addClass("active")
     	    }else if(herf.indexOf("backlogList/requireList.html")>-1||herf.indexOf("backlogList/auditList.html")>-1||herf.indexOf("backlogList/taskList.html")>-1){
     	    	$(".waitDo").find("li").eq(0).addClass("active")
     	    }
     	}
     	
     }
     //账户管理左边菜单
     JM.leftMenuAcount=function(div){
     	 this._div=div
     }
     JM.leftMenuAcount.prototype={
     	init:function(callback){
     		var div=this._div
     		var html=""
     		html+="<h5>系统设置</h5>"
     		html+="<ul class='requirement' ><a href='/page/sxlt/acountNumber/acountManage.html'class='acountManage'><li><span>账号管理</span></li></a>"
     		html+="<a href='/page/sxlt/acountNumber/roleSet.html'class='roleSet'style='display:none'><li><span>角色设置</span></li></a>"
     		html+="<a href='/page/sxlt/acountNumber/productionTypeList.html'style='display:none'class='productTypeManage'><li><span>产品类别</span></li></a>"
     		html+="<a href='/page/sxlt/requirement/requireType.html'style='display:none'class='productTypeManage'><li><span>需求类别</span></li></a>"	
     		html+="</ul>"
     		$(div).html(html)
     		if(typeof callback=="function"){
     			callback()
     		}
     		this.operation()
     		this.defaultShow()
     	},
     	operation:function(){
     		var div=this._div
     		var that=this
     		$(div).on("click","li",function(){
     			$(div).find("li").removeClass("active")
     			$(this).addClass("active")
     		})
     	},
     	defaultShow:function(){
     		var herf=window.location.href
     		if(herf.indexOf("addAcountNumber.html")>-1||herf.indexOf("acountManage.html")>-1||herf.indexOf("SINumberEdit.html")>-1||herf.indexOf("accountEdit.html")>-1||herf.indexOf("AddSINumber.html")>-1){
     			$(".requirement").find("li").eq(0).addClass("active")
     		}else if(herf.indexOf("addRole.html")>-1||herf.indexOf("roleSet.html")>-1){
     			$(".requirement").find("li").eq(1).addClass("active")
     		}else if(herf.indexOf("acountNumber/productionTypeList.html")>-1){
     			$(".requirement").find("li").eq(2).addClass("active")
     		}else{
     			$(".requirement").find("li").eq(3).addClass("active")
     		}
     	}
     }
     //产品管理左边菜单
     JM.leftMenuPro=function(div){
     	 this._div=div
     }
     JM.leftMenuPro.prototype={
     	init:function(){
     		var div=this._div
     		var html=""
     		html+="<h5>管理中心</h5>"
     		html+="<ul class='requirement'><a href='productionList.html'><li><span>产品管理</span></li>" +
     				"<a href='mySolveCaseList.html'><li><span>我的方案</span></li></a>"
     		html+="</ul>"
     		html+="</ul>"
     		$(div).html(html)
     		this.operation()
     		this.defaultShow()
     	},
     	operation:function(){
     		var div=this._div
     		var that=this
     		$(div).on("click","li",function(){
     			$(div).find("li").removeClass("active")
     			$(this).addClass("active")
     		})
     	},
     	defaultShow:function(){
     		var herf=window.location.href
     		if(herf.indexOf("productionList.html")>-1||herf.indexOf("addProduction.html")>-1||herf.indexOf("productionCheck.html")>-1||herf.indexOf("productionDetail.html")>-1){
     			$(".requirement").find("li").eq(0).addClass("active")
     		}else if(herf.indexOf("mySolveCaseList.html")>-1||herf.indexOf("addMyCase.html")>-1||herf.indexOf("mySolveCaseDetail.html")>-1){
     			$(".requirement").find("li").eq(1).addClass("active")
     	    }
     	}
     }
     
   //方案左边菜单
     JM.leftMenuSolve=function(div){
     	 this._div=div
     }
     JM.leftMenuSolve.prototype={
     	init:function(){
     		var div=this._div
     		var html=""
     		html+="<h5>方案中心</h5>"
     		html+="<ul class='requirement'><a href='solveCaseList.html'><li><span>产品方案</span></li></a>"
     		html+="</ul>"
     		html+="</ul>"
     		$(div).html(html)
     		this.operation()
     		this.defaultShow()
     	},
     	operation:function(){
     		var div=this._div
     		var that=this
     		$(div).on("click","li",function(){
     			$(div).find("li").removeClass("active")
     			$(this).addClass("active")
     		})
     	},
     	defaultShow:function(){
     		var herf=window.location.href
     		$(".requirement").find("li").eq(0).addClass("active")
     		/*if(herf.indexOf("productionList.html")>-1||herf.indexOf("productionList.html")>-1){
     			$(".requirement").find("li").eq(0).addClass("active")
     		}*/
     	}
     }
     
     //点击其他地方提示框消失
     JM.hideTips=function(div,clickDiv,triggle){//div为点击元素的父元素||clickDiv为点击元素
     	$(document).on("click",function(e){
     		var e=window.e||e
     		var parentObj=$(e.target).parents()
	 		//console.log($(e.target).parents())
	 		var flag=0
	 		//console.log(parentObj.context.className)
	 		for(var i=0;i<parentObj.length;i++){
	 			if(parentObj[i].className==div||parentObj.context.className.indexOf(clickDiv)>0){
	 				flag=1
	 			}
	 		}
	 		if(flag==0){
	 			$("."+div).remove()
	 			$(triggle).remove()
	 		} 
     	})
     }
     
     //上传附件动画
     JM.upload=function(text){
    	  var html='<div class="progress-wrap">'
    		if(text){
    			 html+=' <div class="progress"></div><p style="color:#f67c17">'+text+'</p></div>'
    		}else{
    			 html+=' <div class="progress"></div><p style="color:#f67c17">正在处理...</p></div>'
    		}
    	 // html+='<div class="JM_cover"></div>'
    	 $("body").append(html)	  
     }
     JM.uploadHide=function(){
    	 $(".progress-wrap").remove()
     }
     
     //关闭弹出框
     JM.hideAlertBox=function(){
    	 $(".JM_tipsConfirm").velocity({"top":"55%"},300,function(){
    		 $(".JM_tipsConfirm,.JM_cover").remove()
		 	 })
     }
     
     
	
	
	
	
//	以下为第二次迭代新增公共方法************************
     //模糊查询↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
	JM.searchBlur = function(arr, divID) {
		this._arr = arr;
		this._div = divID;
	}
	JM.searchBlur.prototype = {
		init: function() {
			this.start()
		},
		start: function() {
			var _this = this._div
			var that = this
			var line = 0
			//console.log(line)
			$(_this).on("keyup", function(e) {
				var event = window.event || e
				event.stopPropagation()
				var value = $(this).val()
				if(value != "") {
					that.creat(value)
					var domLI = $(this).next("ul").find("li")
					var length = domLI.length
					if(event.keyCode == 38) { //上
						if(line > 0) {
							line--
							domLI.removeClass("chosedSearch")
							domLI.eq(line).addClass("chosedSearch")
						} else {
							domLI.removeClass("chosedSearch")
							domLI.eq(length - 1).addClass("chosedSearch")
							line = length - 1
						}
					} else if(event.keyCode == 40) { //下
						if(line < length - 1) {
							line++
							domLI.removeClass("chosedSearch")
							domLI.eq(line).addClass("chosedSearch")
						} else {
							domLI.removeClass("chosedSearch")
							domLI.eq(0).addClass("chosedSearch")
							line = 0
						}

					} else if(event.keyCode == 13) { //回车
						var text = domLI.eq(line).text()
							// console.log(text)
						$(this).val(text)
						$(".showSearch").remove()
						line = 0
					}
				} else {
					$(".showSearch").remove()
					line = 0
				}
			})
			$(".JM_searchArea").on("mouseover", "li", function() { //鼠标放上去选
				$(this).siblings("li").removeClass("chosedSearch")
				$(this).addClass("chosedSearch")
				var index = $(this).index()
				line = index
			})
			$(".JM_searchArea").on("click", "li", function() {
				var text = $(this).text()
				$(_this).val(text)
				$(".showSearch").remove()
				line=0
			})
			$(document).not($(_this)).on("click", function() {
				$(".showSearch").remove()
				line=0
			})
		},
		creat: function(value) {
			var arr = this._arr
			var _this = this._div
			$(".showSearch").remove()
			var html = "<ul class='showSearch'>"
			if(value == "") {
				return false
			}
			for(var i = 0; i < arr.length; i++) {
				if(arr[i].indexOf(value) > -1) {
					html += "<li>" + arr[i] + "</li>"
				}
			}
			html += "</ul>"
			$(_this).after(html)
			$(".showSearch").find("li").eq(0).addClass("chosedSearch")
		}
	}
	//模糊查询↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
	//显示图片↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
	JM.showImg=function(div){
		this._div=div
	}
	JM.showImg.prototype={
		init:function(){
			var div=this._div
			var that=this
			$(div).each(function(){
				var img=$(this).find("img")
				var _this=this
				
				img.on("load",function(){
					that.fitSize(_this,img)
				})
			})
		},
		fitSize:function(_this,img){
			    var imgH=img.height()
				var divH=$(_this).height()
			    if(imgH>divH){//当图片宽度为100%时，高度超过父div
			    	var H=-(imgH-divH)/2
				    img.css("margin-top",H+"px")
			    }else{
			    	img.css({"height":"100%","width":"auto"})
			    	var divW=$(_this).width()
			    	var imgW=img.width()
			    	var w=-(imgW-divW)/2
			    	img.css("margin-left",w+"px")
			    }
		}
	}
    //显示图片↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
    //批量处理时多选↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    
    JM.choseMore=function(div,divparent,all){
    	this._div=div
    	this._pdiv=divparent
    	this._all=all
    }  
    JM.choseMore.prototype={
    	init:function(){
    		var div=this._div
    		var pdiv=this._pdiv
    		var allDiv=this._all
    		if(div.hasClass("check")){
				 div.removeClass("check")
	    		var lspan=div.parents(pdiv).find(".JM_rectCheck").length
	    		var cspan=div.parents(pdiv).find(".JM_rectCheck.check").length
				 if(lspan==cspan){
	    		    $(allDiv).addClass("check")
	    		  }else{
	    		  	$(allDiv).removeClass("check")
	    		  }
    		}else{
	    		  div.addClass("check")
	    		  var lspan=div.parents(pdiv).find(".JM_rectCheck").length
	    		  var cspan=div.parents(pdiv).find(".JM_rectCheck.check").length
	    		  if(lspan==cspan){
	    		  	$(allDiv).addClass("check")
	    		  }else{
	    		  	$(allDiv).removeClass("check")
	    		  }
    		}
    		
    	}
    }
    
    
    //批量处理时多选↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
    //选择地址组件↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    
    JM.choseAddress=function(data,divBox,callback){
    	this._data=data
    	this._callback=callback
    	this._divBox=divBox
    }
    JM.choseAddress.prototype={
    	init:function(){
    		var divBox=this._divBox
    		var data=this._data
    		var html=""
    		html+="<div class='JM_choseAddress'>"
    		html+="<div class='head'>"
    		html+="<ul><li class='active JM_cursor'>省份</li><li class='JM_cursor notAllowed'>城市</li><li class='JM_cursor notAllowed'>区县</li></ul><span class='close'>&#10005</span>"
    		html+="<div style='clear:both'></div></div>"
    		html+="<div class='province addressBox'data-name='省份'><ul></ul></div>"
    		html+="<div class='city addressBox'data-name='城市'><ul></ul></div>"
    		html+="<div class='xian addressBox'data-name='区县'><ul></ul></div>"
    		html+="<footer><button class='JM_btnSmall default sureAddress'>确定</button></footer>"
    		html+="<div>"
    		$(divBox).append(html)
    		this.render(data,0)
    	},
    	render:function(data,type,id){
    		if(type==0){
    			var idArr=[]
	    		var pidArr=[]
	    		for (var i=0;i<data.length;i++) {
	    			idArr.push(data[i].id)
	    			pidArr.push(data[i].parentId)
	    		}
	    		var html=""
	    		for (var j=0;j<idArr.length;j++) {
	    			if(idArr.indexOf(pidArr[j])<0){
	    				//console.log(data[j])
	    				html+="<li  data-code='"+data[j].code+"'data-id='"+data[j].id+"'data-parentId='"+data[j].parentId+"'class='JM_cursor addName'>"+data[j].value+"</li>"
	    			}
	    		}
    		   $(".province ul").html(html)
    		}else if(type==1){
    			if(id){
    				var html=""
    				for (var i=0;i<data.length;i++) {
    					if(data[i].parentId==id){
    						html+="<li data-code='"+data[i].code+"'data-id='"+data[i].id+"'data-pid='"+data[i].parentId+"'class='JM_cursor addName'>"+data[i].value+"</li>"
    					}
    				}
    			}
    			$(".city ul").html(html)
    		}else{
    			if(id){
    				var html=""
    				for (var i=0;i<data.length;i++) {
    					if(data[i].parentId==id){
    						html+="<li data-code='"+data[i].code+"'data-id='"+data[i].id+"'data-pid='"+data[i].parentId+"'class='JM_cursor addName'>"+data[i].value+"</li>"
    					}
    				}
    			}
    			$(".xian ul").html(html)
    		}
    		
    		this.operate()
    	},
    	operate:function(){
    		var that=this
    		var li=$(".JM_choseAddress .head").find("li")
    		$(".addName").unbind("click").bind("click",function(){
    			var type=$(this).parents(".addressBox").attr("data-name")
    			$(this).siblings().removeClass("active")
    			$(this).addClass("active")
    			var id=$(this).attr("data-id")
    			var data=that._data
    			console.log(type)
    			if(type=="省份"){
    			 that.render(data,1,id)
    			 /*$(".addressBox").hide()
    			 $(".city").show()*/
    			 li.eq(1).removeClass("notAllowed")
    			 li.eq(2).addClass("notAllowed")
    			}else if(type=="城市"){
    			 that.render(data,2,id)
    			 /*$(".addressBox").hide()
    			 $(".xian").show()*/
    			 li.eq(2).removeClass("notAllowed")
    			}
    		})
    		li.unbind("click").bind("click",function(){
    			if($(this).hasClass("notAllowed")){
    				return
    			}
    			var type=$(this).text()
    			if(type=="省份"){
    			//	console.log($(".province").html())
    				if($(".province").html().replace(/\s/g,"")!=""){
    					$(this).siblings().removeClass("active")
    			        $(this).addClass("active")
    			        $(".addressBox").hide()
    			        $(".province").show()
    				}
    			}else if(type=="城市"){
    			//	console.log($(".city").html())
    			     if($(".city").html().replace(/\s/g,"")!=""){
    			     	$(this).siblings().removeClass("active")
    			        $(this).addClass("active")
    			     	$(".addressBox").hide()
    			        $(".city").show()
    				}
    			}else{
    			//	console.log($(".xian").html())
    				if($(".xian").html().replace(/\s/g,"")!=""){
    					$(this).siblings().removeClass("active")
    			        $(this).addClass("active")
    					$(".addressBox").hide()
    			        $(".xian").show()
    				}
    			}
    		})
    		
    		//关闭
    		$("span.close").click(function(){
    			$(".JM_choseAddress").remove()
    		})
    		
    		//确定
    		$(".sureAddress").unbind("click").bind("click",function(){
    			var province=$(".province").find("li.active").text()
    			var provinceCode=$(".province").find("li.active").attr("data-code")
    			var city=$(".city").find("li.active").text()
    			var cityCode=$(".city").find("li.active").attr("data-code")
    			var xian=$(".xian").find("li.active").text()
    			var xianCode=$(".xian").find("li.active").attr("data-code")
    			var address=""
    			var addressCode=[provinceCode,cityCode,xianCode]
    			if(province){
    				address=province
    			}
    			if(city&&province){
    				address=province+"-"+city
    			}
    			if(province&&city&&xian){
    				address=province+"-"+city+"-"+xian
    			}
    			var callback=that._callback
    			if(typeof callback=="function"){
    				callback(address,addressCode)
    				$(".JM_choseAddress").remove()
    			}
    		})
    	}
    }
    //选择地址组件↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
    
    //动态定弹出框高度
    JM.getLeftHeight=function(div){
		var height=$(div).height()-15
		return height
	 }
    
    //上传图片↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓依赖于fileUpload
    JM.uploadPic=function(btnDiv,url,fileId){
    	this._btnDiv=btnDiv
    	this._fileId=fileId
    	this._limitData={
    		type:"",
    		scale:"",
    		size:""
    	}
    	this._url=url
    }
    JM.uploadPic.prototype={
    	init:function(setting,callback){
        		if(setting==undefined){
        			alert("请设置上传参数")
        			return
        		}
        		var that=this
        		var div=this._btnDiv
        		this._callback=callback
        		this._limitData.type=setting.type
        		this._limitData.scale=setting.scale
        		this._limitData.size=setting.size
        		var beforeSend=setting.beforeSend
        		var errorTipsFuntion=setting.errorTips
        		this._errorTips=errorTipsFuntion
        		//console.log(this._limitData)
        		var fileId=this._fileId
        		var isnext=true
        		$(div).unbind("click").bind("click",function(){
        			if(typeof beforeSend=="function"){
        				 isnext=beforeSend()=="undefined"?false:beforeSend()
        			}
        			if(isnext==true){
        				  $(fileId).unbind("click")
               		      $(fileId).click()
        			}
        		 
        	    })
        		
        		$(fileId).on("change",function(){
                 //alert(1)
        			
                 that.limit(this,that._limitData)
                })
        	},
        	limit:function(target,setting){
        		var tisp=new JM.tips()
        		var that=this
        		var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        		var fileSize = 0;
				var filetypes = setting.type==undefined?[".jpg", ".png", ".gif",".jpeg",".svg",".bmp",".txt",".ppt",".xls",".docx",".html",".exe",".xml",".php",".java",".rar",".doc",".xlsx"]:setting.type;
				var filepath = target.value;
				/*this._uploadName=filepath
				console.log(filepath)*/
				var size=setting.size==undefined?1:setting.size
				var filemaxsize = 1024 * size; //M数  
				var minScale=setting.scale==undefined?1.5-0.3:setting.scale-0.3
				var maxScale=setting.scale==undefined?1.5+0.3:setting.scale+0.3
				if(filepath) {
					var isnext = false;
					var fileend = filepath.substring(filepath.indexOf("."));
					if(filetypes && filetypes.length > 0) {
						for(var i = 0; i < filetypes.length; i++) {
							if(filetypes[i] == fileend) {
								isnext = true;
								break;
							}
						}
					}
					if(!isnext) {
						var error=this._errorTips
						if(typeof error=="function" ){
							error()
						}else{
							tisp.autoHide("不接受此文件类型！");
						}
						target.value = "";
						return false;
					}
				} else {
					return false;
				}
				if(isIE && !target.files) {//如果是IE浏览器且没有target.files属性
					var filePath = target.value;
					var fileSystem = new ActiveXObject("Scripting.FileSystemObject");//加载控件
					if(!fileSystem.FileExists(filePath)) {
						tisp.autoHide("附件不存在，请重新输入！");
						return false;
					}
					var file = fileSystem.GetFile(filePath);
					fileSize = file.Size;
				} else {
					fileSize = target.files[0].size;
					this._uploadName= target.files[0].name
					console.log(target.files)
				}

				var size = fileSize / 1024;
				if(size > filemaxsize) {
					tisp.autoHide("附件大小不能大于" + filemaxsize / 1024 + "M！");
					target.value = "";
					return false;
				}
				if(size <= 0) {
					tisp.autoHide("附件大小不能为0M！");
					target.value = "";
					return false;
				}
				
				var imgurl = window.URL.createObjectURL(target.files[0]);
				var img = new Image; 
				img.onload = function(){
				  var width=img.width
				  var height=img.height
				  var scale=width/height
				  console.log(scale,minScale,maxScale)
				  /*if(scale>minScale&&scale<maxScale){
				  	if(target.value.length>0){
					   that.beforeUpload()
						}else{
							tisp.autoHide("请选择图片")
						}
				  
					}else{
						tisp.autoHide("请上传长宽比例合适的图片")
						return
					}*/
				  }
				img.src = imgurl;
             },
             beforeUpload:function(){
        		
        		var that=this
	        	setTimeout(function(){
	        		that.ajaxFileUpload()
	        	},500)
        	},
        	ajaxFileUpload:function(id){
        		var that=this
        		var url=this._url
        		var scale=this._limitData.scale
        		var tips=new JM.tips()
        	     $(id).fileupload({
				      //  dataType: 'json',
				        type: 'POST',
						//data: formData,
						/*async: false,
						cache: false,*/
				     //   url:JM.downloadUrl+"fileController/uploadFile",
				        url:url,
				        progressall: function (e, data) {
				        	 JM.upload("正在上传...")
					    },
					    success: function (data) {
				        	console.log(data)
				        	$('#progress .bar').css("width",0)
				        	var name=that._uploadName
        		            console.log(name)
				        	if(data.head.resultCode==200){
				        		var data=data.body
				        		var callback=that._callback
				        		if(typeof callback=="function"){
				        			callback(data)
				        		}
				        	}else{
				        		JM.uploadHide()
					        	tips.autoHide("上传失败")
				        	}
				        },
				        done:function(e,data){
				        	JM.uploadHide()
				        },
				        error:function(data){
				        	JM.uploadHide()
				        	tips.autoHide("上传失败")
				        }
				    });
        	  }
    }
    //上传图片↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
    
    //上传附件↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓依赖于fileUpload
    JM.uploadPicFile=function(btnDiv,url,fileId){
    	this._btnDiv=btnDiv
    	this._fileId=fileId
    	this._limitData={
    		type:"",
    		scale:"",
    		size:""
    	}
    	this._url=url
    }
    JM.uploadPicFile.prototype={
    	init:function(setting,callback){
        		if(setting==undefined){
        			alert("请设置上传参数")
        			return
        		}
        		var that=this
        		var div=this._btnDiv
        		this._callback=callback
        		this._limitData.type=setting.type
        		this._limitData.scale=setting.scale
        		this._limitData.size=setting.size
        		var beforeSend=setting.beforeSend
        		var errorTipsFuntion=setting.errorTips
        		this._errorTips=errorTipsFuntion
        		//console.log(this._limitData)
        		var fileId=this._fileId
        		var isnext=true
        		$(div).unbind("click").bind("click",function(){
        			if(typeof beforeSend=="function"){
        				 isnext=beforeSend()=="undefined"?false:beforeSend()
        			}
        			if(isnext==true){
        				  $(fileId).unbind("click")
               		      $(fileId).click()
        			}
        		 
        	    })
        		
        		$(fileId).on("change",function(){
                 //alert(1)
        			
                 that.limit(this,that._limitData)
                })
        	},
        	limit:function(target,setting){
        		var tisp=new JM.tips()
        		var that=this
        		var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
        		var fileSize = 0;
				var filetypes = setting.type==undefined?"":setting.type;
				var filepath = target.value;
				/*this._uploadName=filepath
				console.log(filepath)*/
				var size=setting.size==undefined?1:setting.size
				var filemaxsize = 1024 * size; //M数  
				var minScale=setting.scale==undefined?1.5-0.3:setting.scale-0.3
				var maxScale=setting.scale==undefined?1.5+0.3:setting.scale+0.3
				if(filepath) {
					var isnext = true;
					var fileend = filepath.substring(filepath.indexOf("."));
					if(filetypes && filetypes.length > 0) {
						for(var i = 0; i < filetypes.length; i++) {
							if(filetypes[i] == fileend) {
								isnext = false;
								break;
							}
						}
					}
					if(!isnext) {
						var error=this._errorTips
						if(typeof error=="function" ){
							error()
						}else{
							tisp.autoHide("不接受此文件类型！");
						}
						target.value = "";
						return false;
					}
				} else {
					return false;
				}
				if(isIE && !target.files) {//如果是IE浏览器且没有target.files属性
					var filePath = target.value;
					var fileSystem = new ActiveXObject("Scripting.FileSystemObject");//加载控件
					if(!fileSystem.FileExists(filePath)) {
						tisp.autoHide("附件不存在，请重新输入！");
						return false;
					}
					var file = fileSystem.GetFile(filePath);
					fileSize = file.Size;
				} else {
					fileSize = target.files[0].size;
					this._uploadName= target.files[0].name
					console.log(target.files)
				}

				var size = fileSize / 1024;
				if(size > filemaxsize) {
					tisp.autoHide("附件大小不能大于" + filemaxsize / 1024 + "M！");
					target.value = "";
					return false;
				}
				if(size <= 0) {
					tisp.autoHide("附件大小不能为0M！");
					target.value = "";
					return false;
				}
				
				var imgurl = window.URL.createObjectURL(target.files[0]);
				var img = new Image; 
				img.onload = function(){
				  var width=img.width
				  var height=img.height
				  var scale=width/height
				  console.log(scale,minScale,maxScale)
				  /*if(scale>minScale&&scale<maxScale){
				  	if(target.value.length>0){
					   that.beforeUpload()
						}else{
							tisp.autoHide("请选择图片")
						}
				  
					}else{
						tisp.autoHide("请上传长宽比例合适的图片")
						return
					}*/
				  }
				img.src = imgurl;
             },
             beforeUpload:function(){
        		
        		var that=this
	        	setTimeout(function(){
	        		that.ajaxFileUpload()
	        	},500)
        	},
        	ajaxFileUpload:function(id){
        		var that=this
        		var url=this._url
        		var scale=this._limitData.scale
        		var tips=new JM.tips()
        	     $(id).fileupload({
				      //  dataType: 'json',
				        type: 'POST',
						//data: formData,
						/*async: false,
						cache: false,*/
				     //   url:JM.downloadUrl+"fileController/uploadFile",
				        url:url,
				        progressall: function (e, data) {
				        	 JM.upload("正在上传...")
					    },
					    success: function (data) {
				        	console.log(data)
				        	$('#progress .bar').css("width",0)
				        	var name=that._uploadName
        		            console.log(name)
				        	if(data.head.resultCode==200){
				        		var data=data.body
				        		var callback=that._callback
				        		if(typeof callback=="function"){
				        			callback(data)
				        		}
				        	}else{
				        		JM.uploadHide()
					        	tips.autoHide("上传失败")
				        	}
				        },
				        done:function(e,data){
				        	JM.uploadHide()
				        },
				        error:function(data){
				        	JM.uploadHide()
				        	tips.autoHide("上传失败")
				        }
				    });
        	  }
    }
    //上传附件↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
    //下载文件方法↓↓↓↓↓↓↓↓↓↓
    JM.download = function(url, method, filedir, filename){
        $('<form action="'+url+'" method="'+(method||'post')+'">' +  // action请求路径及推送方法
                    '<input type="text" name="filePath" value="'+filedir+'"/>' + // 文件路径
                    '<input type="text" name="fileName" value="'+filename+'"/>' + // 文件名称
                '</form>')
        .appendTo('body').submit().remove();
    };
    //下载文件方法↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    
    //指定的div在一定时间后消失↓↓↓↓↓↓↓↓↓↓↓↓↓
    JM.HideTimeout=function(div,time){
    	setTimeout(function(){
    		$(div).remove()
    	},time)
    }
    
    
   
})(window)


