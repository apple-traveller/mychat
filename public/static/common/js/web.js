
    var upload_img_url = "http://www.laychat.com/index/upload/uploadImg"; //发送图片接口
    //var uid = parseInt(Math.random() * 40) + 1;
    //生成随机数
    function RndNum(n){
        var rnd="";
        for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
        return rnd;
    }
    var uid = RndNum(10);

    layui.use('layim', function(layim){
        var layim = layui.layim;
        layim.config({
            init: {
                //配置客户信息
                mine: {
                    "username": "访客" + uid //我的昵称
                    ,"id": uid //我的ID
                    ,"status": "online" //在线状态
                    ,"remark": "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
                    ,"avatar": "//tp1.sinaimg.cn/5619439268/180/40030060651/1" //我的头像
                }
            }

            //上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
            ,uploadImage: {
              url: upload_img_url //接口地址
              ,type: 'post' //默认post
            } 

            //开启客服模式
            ,brief: true
        });

        $("#kf").click(function(){
            // 打开一个客服面板
            layim.chat({
                name: $(this).attr('data-name') //名称
                ,type: 'friend' //聊天类型
                ,avatar: '/static/common/images/common.jpg'
                ,id: $(this).attr('data-id')
            });

            //发送消息
            layim.on('sendMessage', function(res){
                console.log(res);
                // 发送消息
                var mine = JSON.stringify(res.mine);
                var to = JSON.stringify(res.to);
                var login_data = '{"type":"chatMessage","data":{"mine":'+mine+', "to":'+to+'}}';
                socket.send( login_data );
            });

        });


        var socket = new WebSocket('ws://127.0.0.1:8283');
        //连接成功时触发
        socket.onopen = function(){

            socket.send(JSON.stringify({
                type: 'init',
                id: uid,
                username: "访客" + uid,
                avatar: '//tp1.sinaimg.cn/5619439268/180/40030060651/1',
                sign: '在深邃的编码世界，做一枚轻盈的纸飞机'
            }));

            console.log("websocket握手成功!");
        };

        //监听收到的消息
        socket.onmessage = function(res){
            //console.log(res.data);
            var data = eval("("+res.data+")");
            switch(data['message_type']){
                // 服务端ping客户端
                case 'ping':
                    //console.log(data);
                    socket.send('{"type":"ping"}');
                    break;
                // 监测聊天数据
                case 'chatMessage':
                    //console.log(data.data);
                    layim.getMessage(data.data);
                    break;
            }
        };
    });
