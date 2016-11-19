$(document).ready(function(){
	var canvas=$("#canvas").get(0)
	var ctx=canvas.getContext('2d')
	var zuo=$("#zuo").get(0)
	var zuo1=zuo.getContext('2d')
	var you=$("#you").get(0)
	var you1=you.getContext('2d')
	
	var audio = $("#audio").get(0);
    var audio1 = $("#audio1").get(0);
    var audio2 = $("#audio2").get(0);
    var audio3 = $("#audio3").get(0);
	var sep=40
	var sr=4;
	var br=18
//	var qizi=[]
    var qizi={};
    var kongbai={}
    var dan=true;
    var zhuangtai="pased"

	function l(x){
		return (x+0.5)*sep+0.5
	}
	
	function circle(x,y){
		ctx.save()
		ctx.beginPath();
		ctx.arc(l(x),l(y),sr,0,Math.PI*2)
		ctx.closePath()
		ctx.fill()
		ctx.restore()
	}
	
	function huaqipan(){
		ctx.clearRect(0,0,600,600);
		
		ctx.save()
	    ctx.beginPath();
		for(i=0;i<15;i++){
		    ctx.moveTo(l(0),l(i));
			ctx.lineTo(l(14),l(i));
			    
			ctx.moveTo(l(i),l(0));
			ctx.lineTo(l(i),l(14));
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore()
		// 空白棋
		for(var a=0;a<15;a++){
			for(var b=0;b<15;b++){
			  kongbai[a+'_'+b] = {x:a,y:b};
		    }
		}
		
		circle(7,7)
		circle(3,3)
		circle(11,3)
		circle(3,11)
		circle(11,11)
	}

	
	
	//重新开始
	$(".chong").on("click",function(){
		kais=true
		clearInterval(cc)
		clearInterval(c)
		now=15;
		now1=15
		kaishi()
		return false
	})
	
	// 落字
	var img=$("#lang").get(0)
	var img1=$("#yang").get(0)
//	var img=document.getElementById('lang')
//	var img1=document.getElementById('yang')
	function luozi(x,y,color){
		
		ctx.save()
	    ctx.translate(l(x),l(y))
		ctx.beginPath();

        if(color==='black'){
        	ctx.drawImage(img,0,0,36,36,-18,-18,36,36)
        	

        }else if(color==='white'){
        	ctx.drawImage(img1,0,0,36,36,-18,-18,36,36)

        }
		ctx.closePath()
		ctx.restore()
		
		qizi[x+'_'+y]=color
	    delete kongbai[x+'_'+y];
		$(you).removeClass("zuo")
		audio3.pause()
	} 
	

	// 下棋
//	function you(x,y){
//		var flag=false
//		$.each(qizi,function(i,v){
//			if(v.x===x&&v.y===y){
//				var flag=true
//			}
//		});
//		return false
//	}
	
	var kaiguan=true;//true→黑棋，false→白棋
	var kai=true;//true可以落字，false→禁止落子
	$(canvas).on("click",function(e){
		if(kai){
			var x=Math.floor(e.offsetX/sep);
			var y=Math.floor(e.offsetY/sep);
	//		if(you(x,y)){
	//			return
	//		}	        
	        if(qizi[x+'_'+y]){
	        	return
	        }
	        if(dan){
				luozi(x,y,"black")	
				hei(x,y)
				if(kai){
					var p=intel();
				luozi(p.x,p.y,"white")
				bai(p.x,p.y)
				}else{
					return
				}
				
			}else{
				if(kaiguan){
					luozi(x,y,"black")	
					 hei(x,y)
				}else{
					luozi(x,y,"white")	
					bai(x,y)
				}
			
			kaiguan=!kaiguan	
			}
			audio.play();
		}else{
			return
		}
		
	})
	
	//黑棋落下后
	function hei(x,y){
//		tt=setInterval(render1,1000)
//	    clearInterval(t)
		cc=setInterval(time1,1000)
		clearInterval(c)
		$('.hei .time1').html("00:15");
		mow=15
		now1=15
		if(panduan(x,y,"black")>=5){
			zhuangtai="pased"
			audio1.play()
			kais=true
			kai=false
			$(".ying").css("display","block")
			$('<img src="images/shu1.gif" /><img src="images/shu.gif" /><div class="ying1">×</div><div class="ying2">终于抓到你了！</div>').appendTo(".ying")
			 
		}
	}
	
	//白棋落下后
	function bai(x,y){
		
//		t=setInterval(render,1000)
//		 clearInterval(tt)
		c=setInterval(time,1000)
		clearInterval(cc)
		$('.bai .time1').html("00:15");
		now1=15
		now=15
		if(panduan(x,y,"white")>=5){
			zhuangtai="pased"
			if(dan){
				audio2.play()
			}else{
				audio1.play()
			}
			
			kais=true
			kai=false
			$(".ying").css("display","block")
			$('<img src="images/ying.gif" /><img src="images/ying1.gif" /><div class="ying1">×</div><div class="ying2">我一定会回来的！</div>').appendTo(".ying")
		}
	}
	
	var cc=setInterval(time1,1000)
	clearInterval(cc)
	var c=setInterval(time,1000)
	 clearInterval(c)
	 
	 //开始
	 var kais=true
	 function kaishi(){
	 	if(kais){
	 		huiqi={}
	 		qizi={}
		 	$(".ying").css("display","none")
		 	kai=true
		 	now=15;
		 	now1=15
			huaqipan()
			audio.play()
			c=setInterval(time,1000)
			clearInterval(cc)
			$('.bai .time1').html("00:15");
			$('.hei .time1').html("00:15");
		    $(".can").css("display","block")
		    $("#can").css("display","none")
		    kaiguan=true;
		    kais=false
	 	}else{
	 		return
	 	}
	 	if(dan){
	 		$(".shuang").css("boxShadow","none");
    		$(".dan").css("boxShadow","0 0 2px 5px #666")
	 	}else{
	 		$(".dan").css("boxShadow","none");
    		$(".shuang").css("boxShadow","0 0 2px 5px #666")
	 	}
	   zhuangtai="play"
	 }
	 
	$("#caidan").on("click",".kaishi",function(){		
		kaishi()
	})
	// 返回
	$(".fanhui").on("click",function(){
		kais=true
		huaqipan()
		clearInterval(cc)
		clearInterval(c)
		now=15;
		now1=15
		$(".can").css("display","none")
	    $("#can").css("display","block")
	     zhuangtai="pased"
	})
	
    //时间为0时自动落子
    function qiangzhi(){
        var p=intel();		
    	if(kai){
    		if(kaiguan){				
				if(dan){
					luozi(p.x,p.y,"black")	
					hei(p.x,p.y)
				    p=intel();
					luozi(p.x,p.y,"white")
					bai(p.x,p.y)
				}else{
					luozi(p.x,p.y,"black")	
					hei(p.x,p.y)
				}
			}else{
				luozi(p.x,p.y,"white")	
				bai(p.x,p.y)
				
			}
			kaiguan=!kaiguan
			audio.play();
    	}else{
    		return 
    	}
    }
    
   
	// 时钟
	var now=15	
	 $('.hei .time1').html("00:"+now);
	function time(){
      now --;
      if(now<=5){
			audio3.play()
			$(you).addClass("zuo")
		}
      if(now<0){
      	qiangzhi()  	
      }else{
      	 $('.hei .time1').html("00:"+now);
      }
     
	}
	
	var now1=15
	 $('.bai .time1').html("00:"+now1);
	function time1(){
      now1--;
	      if(now1<=5){
	      	audio3.play()
			$(you).addClass("zuo")
		}
       if(now1<0){
       	qiangzhi()    	
      }else{
      	 $('.bai .time1').html("00:"+now1);
      }
     
	}
	
	
	 //秒针
 function miaozhen(zuo){
 	var date=new Date()
 	var s=date.getSeconds()
	zuo.save();
	zuo.translate(50,50)
	zuo.rotate(Math.PI/180*s*6);
	zuo.beginPath();
	zuo.arc(0,0,20,0,Math.PI*2)
	zuo.moveTo(0,0);
	zuo.lineTo(0,10)
	zuo.moveTo(0,0);
	zuo.lineTo(0,-40);
	zuo.closePath();
	zuo.stroke();	
	
   zuo.restore()
 }
 
 //分针
 function fenzhen(zuo){
 	var date=new Date()
 	var s=date.getSeconds()
 	var m=date.getMinutes()
 	m=m+s/60
	zuo.save();
	zuo.translate(50,50)
	zuo.rotate(m*6*Math.PI/180);
	zuo.beginPath();
	zuo.arc(0,0,20,0,Math.PI*2)
	zuo.moveTo(0,0);
	zuo.lineTo(0,10)
	zuo.moveTo(0,0);
	zuo.lineTo(0,-30);
	zuo.closePath();
	zuo.stroke();	
	
   zuo.restore()
 }
 
 //时针
 function shizhen(zuo){
 	var date=new Date()
 	var s=date.getSeconds()
 	var m=date.getMinutes()
 	var h= date.getHours();
 	 h= h + m/60;  
	zuo.save();
	zuo.translate(50,50)
	zuo.rotate(h*30*Math.PI/180);
	zuo.beginPath();
	zuo.arc(0,0,20,0,Math.PI*2)
	zuo.moveTo(0,0);
	zuo.lineTo(0,10)
	zuo.moveTo(0,0);
	zuo.lineTo(0,-20);
	zuo.closePath();
	zuo.stroke();	
	
   zuo.restore()
 }
 
 // 盘
 function pan(zuo){
 	zuo.save();
	zuo.translate(50,50)
 	for(i=0;i<60;i++){
 		zuo.beginPath();
 		zuo.moveTo(0,-35)
 		if(i%5==0){
 			zuo.lineTo(0,-28)
 		}else{
 			zuo.lineTo(0,-32)
 		}
 		zuo.closePath();
 		zuo.stroke();
 		zuo.rotate(Math.PI/180*6)
 	}
	
 	 zuo.restore()
 	
 }

function render(){
	zuo1.clearRect(0,0,100,100);		
	miaozhen(zuo1);
	fenzhen(zuo1);
	shizhen(zuo1)
    pan(zuo1)
   
	
}
function render1(){
	you1.clearRect(0,0,100,100);
	 miaozhen(you1);
	fenzhen(you1);
	shizhen(you1)
    pan(you1)
}

render1()

var tt=setInterval(render1,1000)
	
//判断输赢

function lian(a,b){
	return a+'_'+b
}
function panduan(x,y,color){
	var row=1; var i=1;
	while((qizi[lian(x+i,y)])===color){row++;i++};
	while((qizi[lian(x-i,y)])===color){row++;i++}
	
	var lie=1; i=1
	while((qizi[lian(x,y+i)])===color){lie++;i++};
	while((qizi[lian(x,y-i)])===color){lie++;i++}
	
	var zuo=1; i=1
	while((qizi[lian(x-i,y-i)])===color){zuo++;i++};
	while((qizi[lian(x+i,y+i)])===color){zuo++;i++}
	
	var you=1; i=1
	while((qizi[lian(x+i,y-i)])===color){you++;i++};
	while((qizi[lian(x-i,y+i)])===color){you++;i++}
	
    return Math.max(row,lie,zuo,you)
}

//棋谱
    function chesspManual(){
 	 $(".box").html("")
		ctx.save();
		ctx.font="20px/1 微软雅黑";
		ctx.textAlign="center";
		var i=0;
		for(var j in qizi){
			i++;
			var arr=j.split("_");
			if(qizi[j]==="white"){
				ctx.fillStyle="black";
			}else{
				ctx.fillStyle="white";
			}
		    ctx.fillText(i,l(parseInt(arr[0])),l(parseInt(arr[1])))
		}
		ctx.restore();
		$(".box").show().width("500px").height("500px")
		$("<img>").attr("src",canvas.toDataURL()).appendTo(".box")
		$("<div class='guan'>×</div>").appendTo(".box")
		$('<a>').attr('href',canvas.toDataURL()).attr('download','qipu.png').appendTo('.box')
	}
    
 $(".ying").css("display","none")
   $(".box").hide()
   $(".box").on("click",".guan",function(){
   	   $(".box").hide().width(0).height(0)
 	   ctx.clearRect(0,0,600,600);
		huaqipan()
 	   for(var j in qizi){
  			var arr1=j.split("_");
  			var ax=parseInt(arr1[0])
  			var ay=parseInt(arr1[1])
  			if(qizi[j]==="black"){
				luozi(ax,ay,"black")	
			}else if(qizi[j]==="white"){
				luozi(ax,ay,"white")	
			}
 		}
   })
   $(".ying").on("click",".ying1",function(){
   	$(".ying").html("")
   	   $(".ying").css("display","none")
   	   clearInterval(cc)
	   clearInterval(c)
		now=15;
		now1=15
   })
   
   
   //查看棋谱
   $(".qipu").on("click",function(){
   	chesspManual()
   })
   
   //人人对战
    $("#caidan").on("click",".shuang",function(){
    	if(zhuangtai==="pased"){
    			$(".dan").css("boxShadow","none");
    			$(".shuang").css("boxShadow","0 0 2px 5px #666")
    	}else{
    		return
    	}
    	
    	dan=false
    })
    
   //人机对战
    $("#caidan").on("click",".dan",function(){
    	if(zhuangtai==="pased"){
    		$(".shuang").css("boxShadow","none");
    		$(".dan").css("boxShadow","0 0 2px 5px #666")
    	}else{
    		return
    	}
        dan=true

    })
    
	function intel(){
		var max=-Infinity;
		var pos={}
		for(var k in kongbai){
			var x=parseInt(k.split('_')[0]);
			var y=parseInt(k.split('_')[1]);
			var m=panduan(x,y,'black')
			if(m>max){
				max=m;
				pos={x:x,y:y}
			}
		}
		var max1=-Infinity;
		var pos1={}
		for(var j in kongbai){
			var x1=parseInt(j.split('_')[0]);
			var y1=parseInt(j.split('_')[1]);
			var m1=panduan(x1,y1,'white')
			if(m1>max1){
				max1=m1;
				pos1={x:x1,y:y1}
			}
		}
		console.log(pos,pos1,max,max1)
		if(max>max1){
			return pos
		}else{
			return pos1
		}
	}
 var jian=true
 $(".jianjie").on("click",function(){
 	if(jian){
 		$("#jianjie").css({"height":"280px","opacity":"1"})
 		jian=false
 	}else{
 		$("#jianjie").css({"height":"0px","opacity":"0"})
 		jian=true
 	}
 
 })
 //悔棋
 var huiqi={}
   $(".caidan").on("click",".huiqi",function(){
     	huiqi={}
	   ctx.clearRect(0,0,600,600);
		huaqipan()
		var s=0
		var shu=count(qizi)
   	   for(var j in qizi){
   	   	    s++
			var arr1=j.split("_");
			var ax=parseInt(arr1[0])
			var ay=parseInt(arr1[1])
			if(dan){
				if(s>=shu-1){
					return
			    }else{
					if(qizi[j]==="black"){
						luozi(ax,ay,"black")	
						huiqi[ax+'_'+ay]="black"
					}else if(qizi[j]==="white"){
						luozi(ax,ay,"white")
						huiqi[ax+'_'+ay]="white"
					}
					
				}
			}else{
				if(s>=shu){
					return
			    }else{
					if(qizi[j]==="black"){
						luozi(ax,ay,"black")
						huiqi[ax+'_'+ay]="black"
					}else if(qizi[j]==="white"){
						luozi(ax,ay,"white")
						huiqi[ax+'_'+ay]="black"
					}
					
			    }
			    kaiguan=!kaiguan
			}
		}
   	   if(kaiguan){
	   	   	c=setInterval(time,1000)
			clearInterval(cc)
			$('.bai .time1').html("00:15");
			now1=15
			now=15
	   	   	
   	   }else{
   	   	   cc=setInterval(time1,1000)
			clearInterval(c)
			$('.hei .time1').html("00:15");
			mow=15
			now1=15
   	   }
   	   qizi=huiqi
   })
   
	function count(o){
	    var t = typeof o;
	    if(t == 'string'){
	            return o.length;
	    }else if(t == 'object'){
	            var n = 0;
	            for(var i in o){
	                    n++;
	            }
	            return n;
	    }
	    return false;
	}; 
})
