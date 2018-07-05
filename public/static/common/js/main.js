//建立WebSocket通讯
var socket;

layui.use(['layim'], function(layim){
    var laytpl = layui.laytpl;

    //基础配置
    layim.config({

        //初始化接口
        init: {
            url: user_list_url
            ,data: {}
        }

        //上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
        ,uploadImage: {
          url: upload_img_url //接口地址
          ,type: 'post' //默认post
        } 

        ,chatLog: chatlog_url //聊天记录页面地址，若不开启，剔除该项即可

        ,title:"在线客服系统"
        ,notice: true //是否开启桌面消息提醒，默认false
        ,min:false //用于设定主面板是否在页面打开时，始终最小化展现
        ,isgroup:false //是否开启群组
        ,isfriend:true
        ,copyright:false
        ,initSkin:"5.jpg"
    });

    socket = new WebSocket('ws://127.0.0.1:8283');
    //连接成功时触发
    socket.onopen = function(){
        // 登录
        var login_data = '{"type":"init","id":"' + uid + '", "username":"' + uname + '", "avatar":"' + avatar + '", "sign":"' + sign + '"}';
        socket.send( login_data );
        console.log("websocket握手成功!");
    };

    //监听收到的消息
    socket.onmessage = function(res){
        //console.log(res.data);
        var data = eval("("+res.data+")");
        switch(data['message_type']){
            // 服务端ping客户端
            case 'ping':
                socket.send('{"type":"ping"}');
                break;
            // 在线
            case 'online':
                layim.setFriendStatus(data.id, 'online');
                break;
            // 下线
            case 'offline':
                layim.setFriendStatus(data.id, 'offline');
                break;
            // 监测聊天数据
            case 'chatMessage':
                //console.log(data.data);
                layim.getMessage(data.data);
                break;
            // 离线消息推送
            case 'logMessage':
                setTimeout(function(){layim.getMessage(data.data)}, 1000);
                break;
        }
    };


    //layim建立就绪
    layim.on('ready', function(res){
        //发送消息
        layim.on('sendMessage', function(res){
            //console.log(res);
            // 发送消息
            var mine = JSON.stringify(res.mine);
            var to = JSON.stringify(res.to);
            var login_data = '{"type":"chatMessage","data":{"mine":'+mine+', "to":'+to+'}}';
            socket.send( login_data );
        });

        //在线状态切换
        layim.on('online', function(status){
            var change_data = '{"type":"online", "status":"' + status + '", "uid":"' + uid + '"}';
            socket.send(change_data);
        });
    });

});
