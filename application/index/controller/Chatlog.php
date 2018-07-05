<?php
namespace app\index\controller;

use think\Controller;

class Chatlog extends Base
{
     //聊天记录
    public function index()
    {
        $this->assign([
            'perPage' => config('log_page')
        ]);
        return $this->fetch();
    }


     //聊天记录详情
    public function detail()
    {
        if(request()->isAjax()){

            $perPage = config('log_page');
            $id = input('id');
            $type = input('type');
            $flag = input('flag');  //此处为标识是否获取总数

            $uid = session('l_user_id');
            $field = 'fromname username,fromid id,fromavatar avatar,timeline timestamp,content';
            if('friend' == $type) {

                $where = "((fromid={$uid} and toid={$id}) or (fromid={$id} and toid={$uid})) and type='friend'";

                if(!empty($flag)){
                    $result = db('chat_log')->field('id')->where($where)->count();
                }else{
                    $result = db('chat_log')->field($field)
                        ->where($where)->order('timeline desc')->paginate($perPage);
                }

                if(empty($result)) {
                    return json(['code' => -1, 'data' => '', 'msg' => '没有记录']);
                }

                return json(['code' => 1, 'data' => $result, 'msg' => 'success']);

            } 
        }
        $this->error('非法访问');
    }
}