<?php
// +----------------------------------------------------------------------
// | live-1.0
// +----------------------------------------------------------------------
// | Author: NickBai <1902822973@qq.com>
// +----------------------------------------------------------------------
namespace app\index\controller;
use session\Session;
use think\Controller;

class Web extends Controller
{
    public function index()
    {

        return $this->fetch();
    }

    public function getinfo(){
        if(!session('f_user_id')){
             $uid = time();
              session('f_user_name', "访客".time());
              session('f_user_id', time());
              session('f_user_sign', "访客");
              session('f_user_avatar', "http://www.laychat.com/static/common/images/passerby.jpg");
        }
       //聊天用户
        $userInfo = [
            'id' => session('f_user_id'),
            'username' => session('f_user_name'),
            'avatar' => session('f_user_avatar'),
            'sign' => session('f_user_sign')
        ];

        return json(['code'=>1,'data'=>$userInfo,'msg'=>'SUCCESS']);

        
    }

   
}