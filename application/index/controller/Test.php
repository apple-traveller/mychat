<?php
namespace app\index\controller;
use think\Controller;

class Test extends Controller
{
	public function index(){
		echo "<script>alert('123')</script>";
	}
}

?>