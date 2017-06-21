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
    //画布的款高
    var cw = canvas.width;
    var ch = canvas.height;
    //内间距padding
    var padding = 80;
    //原点，bottomRight:X轴终点,topLeft:Y轴终点
    var origin = {x:padding,y:ch-padding};
    var bottomRight = {x:cw-padding,y:ch-padding};
    var topLeft = {x:padding,y:padding};
    //绘制X轴
    ctx.beginPath();
    ctx.moveTo(origin.x,origin.y);
    ctx.lineTo(bottomRight.x,bottomRight.y);
    //绘制Y轴
    ctx.moveTo(origin.x,origin.y);
    ctx.lineTo(topLeft.x,topLeft.y);
    //设置字号
    ctx.font = '16px SimHei';
    //绘制X方向刻度
    //计算刻度可使用的总宽度
    var avgWidth = (cw - 2*padding - 50)/(key.length-1);
    for(var i=0;i<key.length;i++){
        //循环绘制所有刻度线
        if(i > 0){
            //移动刻度起点
            ctx.moveTo(origin.x+i*avgWidth,origin.y);
            //绘制到刻度终点
            ctx.lineTo(origin.x+i*avgWidth,origin.y-10);
        }
        var txtWidth = ctx.measureText(key[i]).width;
        ctx.fillText(key[i],origin.x+i*avgWidth-txtWidth/2,origin.y+32);
    }
    //绘制Y方向刻度
    //最大刻度max
    var max = Math.max.apply(null,value.join(",").split(","));

    var avgValue=Math.floor(max/5);
    var avgHeight = (ch-padding*2-50)/5;
    for(var i=0;i<key.length;i++){
        //绘制Y轴刻度
    	if(i>0){
            ctx.moveTo(origin.x,origin.y-i*avgHeight);
            ctx.lineTo(origin.x+10,origin.y-i*avgHeight);
    	}
        //绘制Y轴文字
        var txtWidth = ctx.measureText(avgValue*i).width;
        ctx.fillText(avgValue*i,origin.x-txtWidth-5,origin.y-i*avgHeight+6);
    }
    ctx.stroke();
    //绘制折线
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