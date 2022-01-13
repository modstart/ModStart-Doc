# WampServer安装ModStart

## 下载安装WampServer

官网地址：[https://www.wampserver.com/en/](https://www.wampserver.com/en/ "")

![输入图片说明](https://ms-assets.modstart.com/data/image/2022/01/12/54893_yf0z_6718.png)

## 安装完成

右下角出现“W”标记

![be4078cc6f6d5e63fe3c58e898ee6c5.png](https://mz-assets.tecmz.com/data/image/2022/01/12/56656_dcoq_9128.png)

## 下载源码

[https://modstart.com/download](https://modstart.com/download )

![image.png](https://mz-assets.tecmz.com/data/image/2022/01/12/57008_lxym_6652.png)

## 解压源码到`wamp/www`

![16dc07ae2531dbddac11dbcd93a425e.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35013_nxwa_2028.png)

## 选择PHP版本为7.0.x

![051c8603d6d6f71eead1031e5f5c051.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35178_ooex_4586.png)

## 创建数据库

![d499078e40200b2a1307ee97a30b138.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35235_zetw_7974.png)

新建`modstart`数据库

![ba3e7b80fc4130886ec5615cb6fb2fb.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35297_p633_4417.png)

## 修改根目录

**`wamp\scripts\config.inc.php`修改`$wwwDir = $c_installDir.’/www/public’`**


![image.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35754_nbxj_4477.png)


**`wamp\bin\apache\apache2.x.x\conf\httpd.conf`寻找`DocumentRoot`，把后面的值改成`/www/public`**


![b65bdb9887a0d5d480e51cdf9522292.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35718_pfni_2742.png)

## 访问安装目录 `localhost/install.php`

填写数据库信息
填写后台用户名密码
勾选`安装演示数据`和`软件安装许可协议`

![18ddb869dbc5e623504297b4294d169.png](https://mz-assets.tecmz.com/data/image/2022/01/13/35925_ptm2_8379.png)

## 安装完成

![2d6cd40e3c5265465a44d2c9d359337.png](https://mz-assets.tecmz.com/data/image/2022/01/13/36016_e541_9588.png)

## 登录后台

![b7368f9111908523f4a8b4bbbf4d124.png](https://mz-assets.tecmz.com/data/image/2022/01/13/36026_pxts_1485.png)

## 愉快的使用吧

在使用过程中，如果遇到什么问题请及时在社区 [https://modstart.com/forum](https://modstart.com/forum) 进行反馈。
同时，如果再使用过程中有更好的建议或者意见，也请直接在社区中提交意见反馈。