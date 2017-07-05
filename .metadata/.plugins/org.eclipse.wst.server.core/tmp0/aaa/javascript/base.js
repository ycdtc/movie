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
    console.log("draw");
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
    for(var i=0;i<=5;i++){
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

function drawRect(chart,value,key){
    var canvas = document.getElementById(chart);  
    var ctx = canvas.getContext("2d");
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
    
    //绘制Y方向刻度
    var max = Math.max.apply(null,value);
    console.log(max);
    var avgValue=Math.floor(max/5);
    var avgHeight = (ch-padding*2-50)/5;
    for(var i=0;i<=5;i++){
    	if(i>0){
            ctx.moveTo(origin.x,origin.y-i*avgHeight);
            ctx.lineTo(origin.x+10,origin.y-i*avgHeight);
    	}
        var txtWidth = ctx.measureText(avgValue*i).width;
        ctx.fillText(avgValue*i,origin.x-txtWidth-5,origin.y-i*avgHeight+6);
    }
    ctx.stroke();
    
    //绘制X方向刻度
    var avgWidth = (cw - 2*padding - 50)/(key.length);
    for(var i=0;i<key.length;i++){
        var txtWidth = ctx.measureText(key[i]).width;
        ctx.fillText(key[i],origin.x+(i+1)*avgWidth-txtWidth/2,origin.y+32);
    }
    
    for(var i=0;i<value.length;i++){    
    	var height = value[i]/max*(ch-2*padding-50);
        ctx.beginPath();  
        ctx.fillStyle="#abcdef";  
        ctx.rect(origin.x+(i+0.9)*avgWidth,origin.y-height,avgWidth/10,height);  
        ctx.fill();  
        ctx.closePath();  
    }  
    
}

function dbAdd(path,data){
	var fs; 
	//read 1 write 2 add 8
	fs = new ActiveXObject("Scripting.FileSystemObject");
	file = fs.openTextFile(path, 1);
	while(!file.atEndOfStream){
		if(file.readLine() == JSON.stringify(data)){
			return 1;
		}
	}
	file.close();
	file = fs.OpenTextFile(path, 8); 
	file.writeLine(JSON.stringify(data));
	file.close();
	return 0;
}

function dbRemove(path,data){
	var fs; 
	//read 1 write 2 add 8
	fs = new ActiveXObject("Scripting.FileSystemObject");
	file = fs.openTextFile(path, 1);
	var s = "";
	while(!file.atEndOfStream){
		var flag = 0;
		var line = file.readLine();
//		if(line == ""){
//			continue;
//		}
		for(var key in data){
			if(JSON.parse(line)[key] != data[key]){
				flag = 1;
			}
		}
		if(flag == 1){
			s += line + "\r\n";
		}
	}
	file.close();
	file = fs.OpenTextFile(path, 2);
	console.log(s);
	file.write(s.substring(0,s.length-2));
	file.close();
	return 0;
}

function dbSearch(path,data){
	var fs; 
	//read 1 write 2 add 8
	fs = new ActiveXObject("Scripting.FileSystemObject");
	file = fs.openTextFile(path, 1);
	var res = [];
	while(!file.atEndOfStream){
		var flag = 0;
		var line = file.readLine();
//		if(line == ""){
//			continue;
//		}
		for(var key in data){
			if(JSON.parse(line)[key] != data[key]){
				flag = 1;
			}
		}
		if(flag == 0){
			res.push(JSON.parse(line));
		}
	}
	file.close();
	return res;
}

function dbUpdate(path,data,newdata){
	var fs; 
	//read 1 write 2 add 8
	fs = new ActiveXObject("Scripting.FileSystemObject");
	file = fs.openTextFile(path, 1);
	var s = "";
	while(!file.atEndOfStream){
		var flag = 0;
		var line = file.readLine();
//		if(line == ""){
//			continue;
//		}
		for(var key in data){
			if(JSON.parse(line)[key] != data[key]){
				flag = 1;
			}
		}
		if(flag == 1){
			s += line + "\r\n";
		}else{
			var json = JSON.parse(line);
			for(var key in newdata){
				json[key] = newdata[key];
			}
			s += JSON.stringify(json) + "\r\n";
		}
	}
	file.close();
	file = fs.OpenTextFile(path, 2);
	console.log(s);
	file.write(s.substring(0,s.length-2));
	file.close();
	return 0;
}

function dbGetValue(path,key) {
	var res = [];
	var find = dbSearch(path, {});
	for(var i=0;i<find.length;i++){
		if(!$.inArray(find[i][key],res)){
			res.push(find[i][key]);
		}
	}
	return res.sort();
}

function add(){
	fs = new ActiveXObject("Scripting.FileSystemObject");
	file = fs.openTextFile("D:/data/roominfo.txt", 2);
	var brands = ["Zhangjiang","Global harbor","Zhongshan Park","East Nanjing Road"];
	var rooms = ["Room1","Room2","Room3"];
	var seats = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	var movie = ["Despicable Me 3","Spider-Man","Transformers","War of the Planet of the Apes"];
	var times = ["9:00-11:00","1:00-3:00","3:00-5:00","7:00-9:00"];
	var i = 0;
	for ( var brand in brands) {
		for(var room in rooms){
			for(var time in times){
				var json = {"brand":brands[brand], "room":rooms[room],"seats":seats,"time":times[time],"movie":movie[i%movie.length],"price":35};
				file.writeLine(JSON.stringify(json));
				i++;
			}
		}
	}
	file.close();
}