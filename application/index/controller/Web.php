<?php
namespace app\index\controller;
use session\Session;
use think\Controller;

class Web extends Controller
{
    public function index()
    {
		
        return $this->fetch();
    }

   
}