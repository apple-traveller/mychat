document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
        doLogin();
    }
};

$(function(){

    $(".submit_btn").click(function(){
        doLogin();
    });
});

function doLogin(){

    layui.use('layer', function(){
        var layer = layui.layer;
        layer.ready(function(){
            var uname = $("#uname").val();
            var pwd = $("#pwd").val();

            if('' == uname){
                layer.tips('用户名不能为空', '#uname');
                return;
            }

            if('' == pwd){
                layer.tips('密码不能为空', '#pwd');
                return;
            }

            var index = layer.load(0, {shade: false});
            $.post(url, {'uname' : uname, 'pwd' : pwd}, function(res){
                layer.close(index);
                if(1 == res.code){
                    layer.msg(res.msg);
                    window.location.href = res.data;
                }else{
                    layer.msg(res.msg, {'time' : 2000});
                }
            }, 'json');
        });
    });
}
