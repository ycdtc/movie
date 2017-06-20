/**
 * 
 */
function getRequest() {   
	var url = location.search;
	var paras = url.substr(1).split("&");
	var res = new Object();
	for(var i=0;i<paras.length;i++){
		res[paras[i].split("=")[0]] = paras[i].split("=")[1];
	}
	return res;
}  