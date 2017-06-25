/**
 * 
 */

var colors = ["red","orange","green","blue","purple","black"];
function getRequest() {   
	var url = location.search;
	var paras = url.substr(1).split("&");
	var res = new Object();
	for(var i=0;i<paras.length;i++){
		res[paras[i].split("=")[0]] = paras[i].split("=")[1];
	}
	return res;
}  

function drawPie(chart,value,name){
	var can = document.getElementById(chart);
	var ctx = can.getContext("2d");
	var start = 0;
	var end = 0;
	ctx.translate(400,350);
	var sum = 0;
	for(var i=0;i<value.length;i++){
		sum += value[i];
	}
	for(var i=0;i<value.length;i++){
		start = end;
		end += value[i]/sum * 2 * Math.PI;
		ctx.fillStyle = colors[i];
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.arc(0,0,200,start,end);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	}
	start = 0;
	end = 0;
	var now = 0 ;
	for(var i=0;i<value.length;i++){
		start = end;
		end += value[i]/sum * 2 * Math.PI;
		ctx.rotate(now + (end-start)/2);
		now = (end-start)/2;
		ctx.font = "24px";
		ctx.fillStyle = "white";
		ctx.fillText(name[i], 60 , 0);
	}
}

function drawLine(chart,value,name,key){
    var canvas = document.getElementById(chart);
    var ctx = canvas.getContext('2d');
    var cw = canvas.width;
    var ch = canvas.height;
    var padding = 80;
    
    var origin = {x:padding,y:ch-padding};
    var bottomRight = {x:cw-padding,y:ch-padding};
    var topLeft = {x:padding,y:padding};
    //X
    ctx.beginPath();
    ctx.moveTo(origin.x,origin.y);
    ctx.lineTo(bottomRight.x,bottomRight.y);
    //Y
    ctx.moveTo(origin.x,origin.y);
    ctx.lineTo(topLeft.x,topLeft.y);

    ctx.font = '16px SimHei';
    
    //绘制X方向刻度
    var avgWidth = (cw - 2*padding - 50)/(key.length-1);
    for(var i=0;i<key.length;i++){
        if(i > 0){
            ctx.moveTo(origin.x+i*avgWidth,origin.y);
            ctx.lineTo(origin.x+i*avgWidth,origin.y-10);
        }
        var txtWidth = ctx.measureText(key[i]).width;
        ctx.fillText(key[i],origin.x+i*avgWidth-txtWidth/2,origin.y+32);
    }
    //绘制Y方向刻度
    var max = Math.max.apply(null,value.join(",").split(","));
    var avgValue=Math.floor(max/5);
    var avgHeight = (ch-padding*2-50)/5;
    for(var i=0;i<key.length;i++){
    	if(i>0){
            ctx.moveTo(origin.x,origin.y-i*avgHeight);
            ctx.lineTo(origin.x+10,origin.y-i*avgHeight);
    	}
        var txtWidth = ctx.measureText(avgValue*i).width;
        ctx.fillText(avgValue*i,origin.x-txtWidth-5,origin.y-i*avgHeight+6);
    }
    ctx.stroke();
    
    //line
    var labelX = padding;
    for(var k=0;k<name.length;k++){
    	ctx.beginPath();
    	ctx.strokeStyle = colors[k];
	    for(var i=0;i<value[k].length;i++){
	        var posY = origin.y - value[k][i]/max*(ch-2*padding-50);
	        ctx.fillStyle = colors[k];
	        if(i==0){
	            ctx.moveTo(origin.x+i*avgWidth,posY);
	        }else{
	            ctx.lineTo(origin.x+i*avgWidth,posY);
	        }
	    }
	    ctx.moveTo(labelX,padding/2-6);
        ctx.lineTo(labelX+80,padding/2-6);
        ctx.fillStyle="black";
        ctx.fillText(name[k],labelX+90,padding/2);
        labelX += 100 + ctx.measureText(name[k]).width;
        ctx.stroke();
    }	
}

function drawRect(){
    var ocanvas = document.getElementById("can1");  
    var mycanvas = ocanvas.getContext("2d");  
    var arr = [60,90,150,130,170,190,125,175,155,165,155,145];  
  
    //第一先定义一个画线的函数方法    画两条线  
    function line(aX,aY,bX,bY) {//开始和结束的横坐标  开始和结束的纵坐标  
        mycanvas.beginPath();  
        mycanvas.moveTo(aX,aY);  
        mycanvas.lineTo(bX,bY);  
        mycanvas.stroke();  
    }  
    line(300,80,300,480);  
    line(900,80,900,480);  
  
    //第二用for循环 画11条线   利用上面line的画线方法  
    for(var i=0;i<11;i++){  
       //300,80,900,80  
        //300,120,900,120  
       line(300,80+i*40,900,80+i*40);  
        write(200-i*20,280,80+i*40)  
  
    }  
    //第三定义一个矩形的函数方法  
    function rect(X,Y,width,height) {  
        mycanvas.beginPath();  
        mycanvas.fillStyle="#abcdef";  
        mycanvas.rect(X,Y,width,height);  
        mycanvas.fill();  
        mycanvas.closePath()  
    }  
  
    //第四定义一个方法  定义矩形的具体变量以及高引入数组  
    function wenrect() {  
        for(var i=0;i<12;i++){  
            var width=30;  
            var height=arr[i]*2;  
            var X=310+i*40+i*10;  
            var Y=480-height;  
            rect(X,Y,width,height);  
            write((i+1)+"月",320+i*40+i*10,500)  
        }  
    }  
    wenrect();  
  
    //添加字  
    function write(start,ox,oy) {  
        mycanvas.beginPath();  
        mycanvas.fillStyle = "black";  
        mycanvas.fillText(start,ox,oy);  
        mycanvas.closePath();  
    }  
}