<?php
namespace app\index\controller;

use think\Controller;

class Login extends Controller
{
    // 展示登录页面
    public function index()
    {
        return $this->fetch();
    }

    // 处理登录
    public function doLogin()
    {
        if(request()->isAjax()){

            $userName = input('post.username');
            if(empty($userName)){
                return json(['code' => -3, 'data' => '', 'msg' => '用户名不能为空']);
            }

            $password = input('post.password');
            if(empty($password)){
                return json(['code' => -4, 'data' => '', 'msg' => '密码不能为空']);
            }

            $user = db('chat_user')->field('id,username,password,sign,avatar')
                ->where('username', $userName)->find();
            if(empty($user)){
                return json(['code' => -1, 'data' => '', 'msg' => '用户不存在']);
            }

            if( md5($password) != $user['password'] ){
                return json(['code' => -2, 'data' => '', 'msg' => '密码错误']);
            }

            // 设置用户登录
            db('chat_user')->where('id', $user['id'])->setField('status', 1);

            // 设置session标识状态
            session('l_user_name', $user['username']);
            session('l_user_id', $user['id']);
            session('l_user_sign', $user['sign']);
            session('l_user_avatar', $user['avatar']);

            return json(['code' => 1, 'data' => url('index/index'), 'msg' => '登录成功']);
        }

        $this->error('非法访问');
    }

 
}