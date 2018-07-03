layui.use(['layim', 'laypage'], function(){
    var layim = layui.layim
        ,layer = layui.layer
        ,laytpl = layui.laytpl
        ,$ = layui.jquery
        ,laypage = layui.laypage;

    //开始请求聊天记录
    var param =  location.search; //获得URL参数。该窗口url会携带会话id和type，他们是你请求聊天记录的重要凭据
    $.getJSON(chat_log_url + param + '&flag=1', function(res){
        if(1 == res.code){
            var page = Math.ceil(res.data/per_page);
            getLog($, laytpl, laypage, param, page);
        }else{
            layer.msg('没有聊天记录', {time:1500});
        }
    });
});
//获取聊天记录
function getLog($, laytpl, laypage, param, curr){
    $.getJSON(chat_log_url + param +"&page="+ curr, function(res){
        if(1 == res.code){
            var html = laytpl(LAY_tpl.value).render({
                data: res.data
            });
            $('#LAY_view').html(html);
            //分页
            laypage.render({
                cont: 'LAY_page'
                ,pages: Math.ceil(res.data.total/res.data.per_page)
                ,first: false
                ,last: false
                ,curr: curr || 1 //当前页
                ,jump: function(obj, first){
                    if(!first){
                        getLog($, laytpl, laypage, param, obj.curr);
                    }
                }
            });
        }else{
            layer.msg('暂无聊天记录', {time:1000});
        }
    });
}
