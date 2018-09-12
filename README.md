# mychat
基于workerman的在线客服系统

# 如何使用
首先要开启socket服务 
windows系统在vendor/GatewayWorker下单击start_for_win.bat  
linux系统在vendor/GateWorker2/下运行php start.php start -d(守护进程)

将项目clone到你的项目根目录，设置你的虚拟域名指向到thinkPHP5框架的public目录下
访问你的虚拟域名登录客服后台  http://你的域名/index/login/index  (初始账号：马云，初始密码：admin)

前台访客访问  http://你的域名/index/web/index
点击咨询客服就能和后台客服聊天



