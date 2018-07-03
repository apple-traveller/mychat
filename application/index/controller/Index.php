<?php
namespace app\index\controller;

class Index extends Base
{
    public function index()
    {
        // 聊天用户
        $userInfo = [
            'id' => session('l_user_id'),
            'username' => session('l_user_name'),
            'avatar' => session('l_user_avatar'),
            'sign' => session('l_user_sign')
        ];

        $this->assign([
            'uinfo' => $userInfo
        ]);

        return $this->fetch();
    }

    // 获取列表
    public function getList()
    {
        // 查询自己的信息
        $uid = session('l_user_id');
        $mine = db('chat_user')->where('id', $uid)->find();

        $friends = ['groupname' => '网站客服', 'id' => 1];
        $where = [
             'id'=>['<>',$uid],
             'iskefu'=>1
        ];
        $list = db('chat_user')->field('username,id,avatar,sign,status')
            ->where($where)->select();
        foreach($list as $key=>$vo){
            if(empty($vo['status'])){
                $list[$key]['status'] = 'offline';
            }else{
                $list[$key]['status'] = 'online';
            }
        }
        $friends['list'] = $list;

        $return = [
            'code' => 0,
            'msg'=> '',
            'data' => [
                'mine' => [
                    'username' => $mine['username'],
                    'id' => $mine['id'],
                    'status' => 'online',
                    'sign' => $mine['sign'],
                    'avatar' => $mine['avatar']
                ],
                'friend' => [$friends],
                'group' => []
            ],
        ];

        return json( $return );

    }
}

