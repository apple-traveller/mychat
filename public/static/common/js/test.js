
function addJS(url){
	new_element=document.createElement("script");
	new_element.setAttribute("type","text/javascript");
	new_element.setAttribute("src",url);
	document.body.appendChild(new_element);
}
addJS("http://abc.maomin.xyz/layui/layui.js");
addJS("http://www.laychat.com/static/common/js/web.js");