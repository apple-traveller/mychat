<?php
namespace app\index\controller;

use think\Controller;
use session\Sessin;

class Base extends Controller
{
    public function _initialize()
    {
        if(empty(session('l_user_name'))){

            $this->redirect(url('login/index'));
   
        }

        $this->assign('socket_server', config('socket_server') . ':' . config('socket_port'));
    }
}