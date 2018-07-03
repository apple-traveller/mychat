$(document).ready(function(){
    var msgBox;
    $('#charea').click(function(){
        //页面层
        layui.use(['layer'], function(){
            var layer = layui.layer;
            layer.ready(function(){
                msgBox = layer.open({
                    type: 1,
                    title:'选择省市区',
                    closeBtn :0,
                    skin: 'layui-layer-rim', //加上边框
                    area:'350px',
                    content: $("#show")
                });
            });
        });
    });
    $("#makesure").click(function(){
        layui.use(['layer'], function(){
            var layer = layui.layer;
            layer.close(msgBox);
        });
    });

    //省市区,三级联动  ---- begin -----
    $("#p").change(function(){
        var pid = $(this).find("option:selected").attr('data-id');
        $("#pid").val(pid);
        $("#cid").val(0);
        $("#aid").val(0);
        $("#pname").val($(this).find("option:selected").val());
        $("#cname").val('');
        $("#aname").val('');
        //已经选择了省份，又不选择省份，改变属性
        if( '0' == pid){
            $("#pname").val('不限区域');
            $("#c").html('<option value="0" data-id="0">选择城市</option>').attr('disabled', true);
            $("#a").html('<option value="0" data-id="0">选择区</option>').attr('disabled', true);
        }
        showArea();
        if('0' == pid){
           return ;
        }
        $.post(area_url, {'code' : pid}, function(res){
            if(1 == res.code){
                var _html = '<option value="0" data-id="0">选择城市</option>';
                $.each(res.data, function(k, v){
                    _html += '<option value="' + v.area_name + '" data-id="' + v.id + '">' + v.area_name + '</option>';
                });
                $('#c').html(_html);
            }
        }, 'json');
        $("#c").removeAttr('disabled'); //去除不可选状态
        $("#a").html('<option value="0" data-id="0">选择区</option>').attr('disabled', true);
    });

    $("#c").change(function(){
        var cid = $(this).find("option:selected").attr('data-id');
        $("#cid").val(cid);
        $("#aid").val(0);
        $("#cname").val($(this).find("option:selected").val());
        $("#aname").val('');
        //已经选择了城市，又不选择城市，改变属性
        if( '0' == cid){
            $("#cname").val('');
            $("#a").html('<option value="0" data-id="0">选择区</option>').attr('disabled', true);
        }
        showArea();
        if( '0' == cid ){
           return ;
        }
        $.post(area_url, {'code' : cid}, function(res){
            if(1 == res.code){
                var _html = '<option value="0" data-id="0">选择区</option>';
                $.each(res.data, function(k, v){
                    _html += '<option value="' + v.area_name + '" data-id="' + v.id + '">' + v.area_name + '</option>';
                });
                $('#a').html(_html);
            }
        }, 'json');
        $("#a").removeAttr('disabled'); //去除不可选状态
    });

    $("#a").change(function(){
        var aid = $(this).find("option:selected").attr('data-id');
        $("#aid").val(aid);
        $("#aname").val($(this).find("option:selected").val());
        if('0' == aid){
            $("#aname").val('');
        }
        showArea();
    });
    //---- end -----

    //搜索好友
    $("#search").click(function(){

        var data = $("#userForm").serialize();
        layui.use(['layer'], function(){
            var layer = layui.layer;

            if( '' == $("#user_name").val() && '' == $("#age").val()
                && '' == $("#sex").val() && '' == $("#pid").val() && '' == $("#cid").val() && '' == $("#aid").val()){
                layer.ready(function(){
                    layer.msg('请至填写一个搜索项', {'time' : 2000});
                });
                return ;
            }

            layer.ready(function(){
                var loading = layer.load(0, {shade: false});
                $.post(search_user_url, data, function(res){
                    layer.close(loading);
                    if(1 == res.code){
                        if( 0 == res.data.length ){
                            $("#s_u_data").html('<p style="text-align: center;font-size: 18px">暂无符合条件的数据，换个条件试试！</p>');
                            return;
                        }
                        var _html = '';
                        $.each(res.data, function(k, v){
                            _html += '<div class="col-sm-3"><div class="ibox float-e-margins"><div class="ibox-title">';
                            _html += '<h5>' + v.user_name + '</h5><span style="margin-left: 10px">';
                            var style = 'style="color:#FDA357"';
                            if(1 == v.sex){
                                style = 'style="color:#7CA3D2"';
                            }
                            _html += '<i class="layui-icon" ' + style + '>&#xe612;</i></span>';
                            _html += '<span style="margin-left: 10px">' + v.age + '岁</span></div>';
                            _html += '<div class="ibox-content"><div style="margin: 0 auto"><img src="' + v.avatar + '" width="50px" height="50px"/>';
                            _html += '<span style="font-size: 10px;margin-left: 5px">' + v.area + '</span></div>';
                            _html += '<div style="margin:10px 50px"><button class="btn btn-primary" type="button" onclick="addFriend(' + v.id + ')">';
                            _html += '加好友</button></div></div></div></div>';
                        });
                        $("#s_u_data").html(_html);
                    }
                }, 'json');
            });
        });
    });

    //搜索群组
    $("#find").click(function(){

        layui.use(['layer'], function(){
            var layer = layui.layer;
            var search_txt = $("#search_txt").val();
            if( '' == search_txt ){
                layer.ready(function(){
                    layer.msg('群组名称不能为空', {'time' : 2000});
                });
                return;
            }
            $.getJSON(search_group_url, {'search_txt':search_txt}, function(res){
                var _html = "";
                $("#search_title").text('搜索结果：');
                if( 1 == res.code ){
                    $.each(res.data, function(k, v){
                        _html += '<div class="col-sm-3"><div class="ibox float-e-margins"><div class="ibox-title">';
                        _html += '<h5>' + v.group_name + '</h5></div><div class="ibox-content"><div style="margin: 0 auto">';
                        _html += '<img src="' + v.avatar + '" width="50px" height="50px" style="margin-left:50px"/>';
                        _html += '</div><div style="margin:10px 50px"><button class="btn btn-primary" type="button" onclick="joinGroup('+ v.id +')">加入</button></div>';
                        _html += '</div></div></div>';
                    });
                    $("#search_data").html(_html);

                }else{
                    _html += '<div class="col-sm-12"><div class="ibox float-e-margins"><div class="ibox-content">';
                    _html += '<div class="form-group"><div class="col-sm-10"><label style="color: red">' + res.msg + '</label>';
                    _html += '</div></div></div></div></div>';

                    $("#search_data").html(_html);
                }
            });
        });
    });

    //创建群组
    $("#addGroup").click(function(){
        layui.use(['layer'], function(){
            var layer = layui.layer;
            layer.ready(function(){
                //iframe层
                layer.open({
                    type: 2,
                    title: '创建群组',
                    shadeClose: true,
                    shade: false,
                    maxmin: false, //开启最大化最小化按钮
                    area: ['850px', '460px'],
                    content: add_group_url
                });
            });
        });
        //close_layer();  //关闭当前的layer层
    });

    //管理的群组
    $("#myGroup").click(function(){
        window.location.href = my_group_url;
    });
});
//加入群组
function joinGroup(groupid){
    $.getJSON(join_group_url, {'gid' : groupid}, function(res){
        if( 1 == res.code ){

            var join_data = res.data;
            //socket.send( join_data );  //发送socket
            layui.use(['layer'], function(){
                var layer = layui.layer;
                layer.ready(function(){
                    layer.msg(res.msg, {'time' : 2000});
                });
            });
        }else{
            layui.use(['layer'], function(){
                var layer = layui.layer;
                layer.ready(function(){
                    layer.msg(res.msg, {'time' : 2000});
                });
            });
        }
    })
}

function close_layer(){
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}

function showArea(){
    var str = '';
    if('' != $("#pname").val()){
        str += $("#pname").val();
    }
    if('' != $("#cname").val()){
        str += '-' + $("#cname").val();
    }
    if('' != $("#aname").val()){
        str += '-' + $("#aname").val();
    }
    $("#ssq").text(str).attr('style', 'font-size:12px');
}

//选择男女
function chsex(tag){
    if(0 == tag){
        $("#sex").val(0);
        $("#csex").text('不限性别');
    }else if(1 == tag){
        $("#sex").val(1);
        $("#csex").text('男');
    }else{
        $("#sex").val(-1);
        $("#csex").text('女');
    }
}

//选择年龄
function chage(tag){
    $("#age").val(tag);
    if('0-0' == tag){
        $("#cage").text('不限年龄');
    }else if('0-18' == tag){
        $("#cage").text('18岁以下');
    }else if('35-120' == tag){
        $("#cage").text('35岁以上');
    }else{
        $("#cage").text(tag + '岁');
    }

}
