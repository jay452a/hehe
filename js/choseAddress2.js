var choseAddress=function(data){
	this._data=data
}
choseAddress.prototype={
	unique:function(arr){
		  var result = [], isRepeated;
		  for (var i = 0, len = arr.length; i < len; i++) {
		    isRepeated = false;
		    for (var j = 0, len = result.length; j < len; j++) {
		      if (arr[i] == result[j]) {  
		        isRepeated = true;
		        break;
		      }
		    }
		    if (!isRepeated) {
		      result.push(arr[i]);
		    }
		  }
		  return result;
	},
	init:function(callback){
		this._callback=callback
		/*for(var i=0;i<this._data.length;i++){
			this._data[i].checked=0
		}*/
		this.view()
		this.operate()
	},
	view:function(){
		var html=""
		html+="<div class='JM_choseAddressBox'><header><span class='cancel'>取消</span><span class='sure'>确定</span></header>"
		html+="<section class='body'>"
		html+="<div class='left'></div>"
		html+="<div class='right'></div>"
		html+="</section></div>"
		if($(".JM_choseAddressBox").length==0){
			$("body").append(html)
		}
		this.getRootData()
	},
	getRootData:function(){
		var data=this._data
		var pid=[]
		var pArr=[]
		var cArr=[]
		//判断一个节点是否有父节点，将pid组成一个数组，将id组成一个数组，判断是pid数组中的成员是否在
		//id数组中，若不在，则无父节点，即为根节点
		for (var i=0;i<data.length;i++){
			pArr.push(data[i].pid)
			cArr.push(data[i].id)
		}
		//console.log(pArr)
		//console.log(cArr)
		for (var c=0;c<pArr.length;c++) {
			if(cArr.indexOf(pArr[c])<0){
				pid.push(pArr[c])
			}
		}
		//console.log(pid)
		this._rootId=pid
		this.render(pid,null,null)
	},
	render:function(idArr,pid,lid){//id本级向后递归，pid本级的前一级向后递归
		var data=this._data
		idArr=this.unique(idArr)
		/*console.log(idArr)
		console.log(data)*/
		var renderHtml="<ul>"
		for (var i=0;i<data.length;i++){
			for (var j=0;j<idArr.length;j++) {
				if(data[i].pid==idArr[j]){
					renderHtml+="<li data-id='"+data[i].id+"'data-pid='"+data[i].pid+"'>"+data[i].name+"</li>"
				}
			}
			if(data[i].id==pid){
				renderHtml+="<li data-id='"+data[i].id+"'data-pid='"+data[i].pid+"'>"+data[i].name+"</li>"
			}
		}
		renderHtml+="</ul>"
		$(".JM_choseAddressBox").find(".left").html(renderHtml)
		
		if(lid==null||lid==undefined){
			var rid=$(".JM_choseAddressBox").find(".left").find("li").eq(0).attr("data-id")
			$(".JM_choseAddressBox").find(".left").find("li").eq(0).addClass("checked")
		    this.renderRight(rid)
		}else{
			$(".JM_choseAddressBox").find(".left").find("li").each(function(){
				if($(this).attr("data-id")==lid){
					$(this).addClass("checked")
				}
			})
			this.renderRight(lid)
		}
		
	},
	renderRight:function(rid){
		var data=this._data
		var renderHtml="<ul>"
		for(var i=0;i<data.length;i++){
			if(rid==data[i].pid){
				renderHtml+="<li data-id='"+data[i].id+"'data-pid='"+data[i].pid+"'>"+data[i].name+"</li>"
			}
		}
			renderHtml+="</ul>"
		$(".JM_choseAddressBox").find(".right").html(renderHtml)
	},
	operate:function(){
		var that=this
		var data=this._data
		$(".JM_choseAddressBox .right").on("click","li",function(){//右边下一级，往后递归
			var id=$(this).attr("data-pid")
			var lid=$(this).attr('data-id')
			var hasChild=false
			for(var i=0;i<data.length;i++){
				if(data[i].pid==lid){
					hasChild=true
				}
			}
			if(hasChild==false){
				if($(this).hasClass("checked")){
					$(".JM_choseAddressBox .right").find("li").removeClass("checked")
				}else{
					$(".JM_choseAddressBox .right").find("li").removeClass("checked")
					$(this).addClass("checked")
				}
				return
			}
			that.render([id],null,lid)
		})
		$(".JM_choseAddressBox .left").on("click","li",function(){//左边返回，往前递归
			var rootId=that._rootId
			if($(this).hasClass("checked")){
				var pid=$(this).attr('data-pid')
				var ppid=[]//当前的爷爷级，通过爷爷来找爸爸，则返回可得到爸爸和爸爸的兄弟
				for (var i=0;i<data.length;i++){
					if(data[i].id==pid){
					   ppid.push(data[i].pid)
					}
				}
				//console.log(ppid)
				if(rootId.indexOf(pid)>-1){
				  return
			    }else{
			    	if(rootId.indexOf(ppid[0])>-1){
			    		that.render(rootId,null,pid)
			    	}else{
			    		that.render(ppid,null,pid)
			    	}
			    }
			}else{
				var pid=$(this).attr("data-pid")
				var lid=$(this).attr('data-id')
				if(rootId.indexOf(pid)>-1){//判断当前节点是否属于根节点
					that.render(rootId,null,lid)
				}else{
				  that.render([pid],null,lid)
				}
				
			}
			
		})
		$(".JM_choseAddressBox").find("span.cancel").click(function(){
			that.cancel()
		})
		$(".JM_choseAddressBox").find("span.sure").click(function(){
			that.sure()
		})
	},
	cancel:function(){
		 var i=0 
		 var timer=setInterval(function(){
		 	i+=10
		 	if(i>100){
		 		clearInterval(timer)
		 		$(".JM_choseAddressBox").remove()
		 	}else{
		 		$(".JM_choseAddressBox").css('top',i+"%")
		 	}
		 	
		 },30)
	},
	sure:function(){
		 var data=this._data
		 var callback=this._callback
		 var rootId=this._rootId
		 var id=""
		 var pid=""
		 var addressName=""
		 //var address=""
		 var rightLi=$(".JM_choseAddressBox").find(".right").find("li.checked")
		 var leftLi=$(".JM_choseAddressBox").find(".left").find("li.checked")
		 if(rightLi.length>0){
		 	id=rightLi.attr("data-id")
		 	pid=rightLi.attr("data-pid")
		 	addressName=rightLi.text()+","
		 }
		 if(rightLi.length==0&&leftLi.length>0){
		 	id=leftLi.attr("data-id")
		 	pid=leftLi.attr("data-pid")
		 	addressName=leftLi.text()+","
		 }
		// console.log(id,pid)
		 /*for (var i=0;i<data.length;i++){
		 	data[i].checked=0
		 	if(data[i].id==id){
		 		data[i].checked=1
		 	}
		 }*/
		 (function(pid){
		 	var pid2
		 	if(rootId.indexOf(pid)>-1){//递归结束条件为查到根节点
		 		return
		 	}else{
			 	for(var i=0;i<data.length;i++){
			 		if(data[i].id==pid){
			 			data[i].checked=1
			 			pid2=data[i].pid
			 			addressName+=data[i].name+","
			 		}
			 	}
		 	}
		 	return arguments.callee(pid2)
		 })(pid)
		 console.log(addressName)
		 var addArr=addressName.split(",").reverse().join("")
		 //console.log(id)
		 //console.log(addArr)
		 var returnData={
		 	addressId:id,
		 	address:addArr
		 }
		 if(typeof callback=="function"){
		 	callback(returnData)
		 }
		 this.cancel()
	}
}
