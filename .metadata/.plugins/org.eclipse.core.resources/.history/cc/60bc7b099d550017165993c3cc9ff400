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
		ctx.font = "20px";
		ctx.fillStyle = "white";
		ctx.fillText(name[i], 60 , 0);
	}	
	ctx.rotate(-Math.PI/6);
}