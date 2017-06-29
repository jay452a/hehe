   //APPtree通讯录
     var treeData//树形数据
     function AppTree(data){
     	this._data=data
     }
     AppTree.prototype={
    		 init:function(callback){
  			   this.getData()
  			   this._callback=callback
  		 },
  		 getData:function(){
  			                var data=this._data
  			 				//treeData=json
  			 				treeData=data
  			 				console.log(treeData)
  			 				this.creat(treeData,[0])
  			 	
  		 },
  		 creat:function(json,id){
  		 	    var hasChild=[]
			    var html="<div class='right_slide_child'><div class='head'><span class='back'></span>请选择<span class='chosedOver'>完成</span></div><ul>"
			    //	console.log(chesedId)
			    for (var i=0;i<json.length;i++){
			    	for (var j=0;j<id.length;j++){
			    		if(json[i].pid==id[j]){
			    			hasChild.push(1)
			    			if(json[i].status==0){
			    				html+="<li data-id='"+json[i].id+"'data-isuser='"+json[i].isUser+"'data-pid='"+json[i].pid+"'><span class='checkbox'data-status='"+json[i].status+"'></span><label class='choseNode'>"+json[i].name+"</label></li>"
			    			}else if(json[i].status==1){
			    				html+="<li data-id='"+json[i].id+"'data-isuser='"+json[i].isUser+"'data-pid='"+json[i].pid+"'><span class='checkbox checked'data-status='"+json[i].status+"'></span><label  class='choseNode'>"+json[i].name+"</label></li>"
			    			}else {
			    				html+="<li data-id='"+json[i].id+"'data-isuser='"+json[i].isUser+"'data-pid='"+json[i].pid+"'><span class='checkbox normal'data-status='"+json[i].status+"'></span><label  class='choseNode'>"+json[i].name+"</label></li>"
			    			}
 			    	   }
			    	}
			    }
			   // html+="</ul><div class='bottom_btn'><button class='sure'>确定</button><button class='cancel'>取消</button></div>"
			    var obj=$(html)
			    if(hasChild.length==0){
			    	alert("无子集")
			    	return
			    }
			    $("body").append(obj)
			   /* if($(".right_slide_child").find("li").length==0){
			    	alert(1)
			    }*/
			    $(".right_slide_child").velocity({"left":"5%"},400)
			    this.operation(json)
		 },
		 operation:function(json){
			 var that=this
			 $(".right_slide_child li span.checkbox").unbind("click").bind("click",function(){
				var id=$(this).parent("li").attr("data-id")//获取操作json的id
				var status=$(this).attr("data-status")//获取当前状态用于判断
				console.log(id)
				if(status==0||status==2){
					$(this).addClass("checked")
					$(this).removeClass("normal")
					$(this).attr("data-status",1)
					
					for (var i=0;i<json.length;i++){
						if(json[i].id==id){
							json[i].status=1
						}
					}
					(function(idArr,status){//往后递归多对多
						var idArr2=[]
						if(idArr.length==0){
							return 
						}else{
							for (var i=0;i<json.length;i++){
								for (var j=0;j<idArr.length;j++){
									if(json[i].pid==idArr[j]){
										idArr2.push(json[i].id)
										json[i].status=status
									}
								}
							}
						//	console.log(idArr2)
							return arguments.callee(idArr2,1)
						}
					})([id],1)
				}else{
					$(this).removeClass("checked")
					$(this).removeClass("normal")
					$(this).attr("data-status",0)
					for (var i=0;i<json.length;i++){
						if(json[i].id==id){
							json[i].status=0
						}
					}
					(function(idArr,status){//往后递归多对多
						var idArr2=[]
						if(idArr.length==0){
							return 
						}else{
							for (var i=0;i<json.length;i++){
								for (var j=0;j<idArr.length;j++){
									if(json[i].pid==idArr[j]){
										idArr2.push(json[i].id)
										json[i].status=status
									}
								}
							}
						//	console.log(idArr2)
							return arguments.callee(idArr2,0)
						}
					})([id],0)
				}
				   var _this= $(this).parents(".right_slide_child")
				   var lengLi=_this.find("li").length
				   var lengthChecked=_this.find("li span.checked").length
				   var lengthNormal=_this.find("li span.normal").length
				   var pid=_this.find("li").eq(0).attr("data-pid")//获取pid
				//判断选中了多少用于往前递归状态
			
				if(lengLi>lengthChecked){
					if(lengthChecked==0){
						  //calleedata(pid,0)
						(function(pid,status){//往前递归多对一
							for (var i=0;i<json.length;i++){
								if(json[i].id==pid){
						    		json[i].status=status
						    		return arguments.callee(json[i].pid,0)
						    	}
							}
						})(pid,0)
						
					}else{
						(function(pid,status){
							for (var i=0;i<json.length;i++){
								if(json[i].id==pid){
						    		json[i].status=status
						    		return arguments.callee(json[i].pid,2)
						    	}
							}
						})(pid,2)
					}
				}
				   if(lengthNormal>0){
					   (function(pid,status){
							for (var i=0;i<json.length;i++){
								if(json[i].id==pid){
						    		json[i].status=status
						    		return arguments.callee(json[i].pid,2)
						    	}
							}
						})(pid,2)
				   }  
				   if(lengLi==lengthChecked){
					   (function(pid,status){
							for (var i=0;i<json.length;i++){
								if(json[i].id==pid){
						    		json[i].status=status
						    		return arguments.callee(json[i].pid,1)
						    	}
							}
						})(pid,1)
				   }
				 console.log(treeData)
				treeData=json
				//console.log(treeData)
			 })
			 //点击跳转子节点
			 $(".right_slide_child li label.choseNode").unbind("click").bind("click",function(){
				 var isuser=$(this).parent("li").attr("data-isuser")
				 console.log(isuser)
				 if(isuser=="true"){
					 return
				 }
				 var id=$(this).parent("li").attr("data-id")
				 var status=$(this).prev("span").attr("data-status")
				 console.log(id)
				 console.log(status)
		      if(status==1){
					for (var i=0;i<treeData.length;i++){
						if(treeData[i].pid==id){
							treeData[i].status=1
						}
					}
				 }else if(status==0){
					 for (var i=0;i<treeData.length;i++){
							if(treeData[i].pid==id){
								treeData[i].status=0
							}
						}
				 }else{
					 
				 }
				 //console.log(treeData)
				 that.creat(treeData,[id])
			 })
			 //返回
			 $(".right_slide_child").on("click",".back",function(){
				  var _this= $(this).parents(".right_slide_child")
				  var lengLi=_this.find("li").length
				  var lengthChecked=_this.find("li span.checked").length
				  var lengthNormal=_this.find("li span.normal").length
				  var pid=_this.find("li").eq(0).attr("data-pid")//获取pid
				  console.log(lengthNormal)
				  if(lengLi>lengthChecked){
					  if(lengthChecked==0){
						  _this.prev().find("li").each(function(){
							  if($(this).attr("data-id")==pid){
								  $(this).find("span").removeClass("normal")
								  $(this).find("span").removeClass("checked")
								    $(this).find("span").attr("data-status",0)
							  }
						  })
					  }else{
						  _this.prev().find("li").each(function(){
							  if($(this).attr("data-id")==pid){
								  $(this).find("span").addClass("normal")
								  $(this).find("span").removeClass("checked")
								    $(this).find("span").attr("data-status",2)
							  }
						  })
					  }
				  }
				  if(lengthNormal>0){
					  _this.prev().find("li").each(function(){
						  if($(this).attr("data-id")==pid){
							  $(this).find("span").addClass("normal")
							  $(this).find("span").removeClass("checked")
							    $(this).find("span").attr("data-status",2)
						  }
					  })
				  }
				  if(lengLi==lengthChecked){
					  _this.prev().find("li").each(function(){
						  if($(this).attr("data-id")==pid){
							  $(this).find("span").removeClass("normal")
							  $(this).find("span").addClass("checked")
							    $(this).find("span").attr("data-status",1)
						  }
					  })
				  }
				  console.log(treeData)
				   _this.velocity({"left":"100%"},400,function(){
    			    		 _this.remove()
    			    	 })
			 })
			this.overData()
		 },
		 overData:function(){
			 //点击完成获取数据
			var that=this
			var chosedData=[]
			 $(".right_slide_child .chosedOver").unbind("click").bind("click",function(){
				 for (var i=0;i<treeData.length;i++){
					 if(treeData[i].status==1){//根据具体条件来判断选中的结果
						 chosedData.push(treeData[i])
					 }
				 }
				// console.log(chosedData)
				  $(".right_slide_child").velocity({'left':"100%"},400,function(){
					  $(".right_slide_child").remove()
					  $(".cover").hide()
					  $("body").css("overflow","auto")
				  })
				  var callback=that._callback
				  if( typeof callback== "function"){
					  callback(chosedData)//回调函数中得到返回值
				  }
			 })
			
		 }
     }
     