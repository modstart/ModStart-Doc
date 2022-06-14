# 宝塔安装ModStart

## 宝塔三步安装


1. 登录宝塔后台系统，进入软件商店 > 一键部署，搜索“ModStart”

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//1.png">

2. 点击“一键安装”，输入安装信息（域名、数据库等）

> - 域名：modstart.com
> - 根目录：`/www/wwwroot/modstart.com`
> - 数据库：`modstart_com`
> - 选择PHP版本：`5.6.x`

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//2.png">

提交后进入到安装向导

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//3.png">

3. 进入安装引导程序，输入管理用户和密码，完成安装

<p><strong>引导程序：</strong>http://modstart.com/install.php</p>

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//4.jpg">

## 注意事项

### 伪静态配置

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//7.png">

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//8.png">

### 解禁函数

- `shell_exec`
- `proc_open`
- `putenv`

操作指引

<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//5.png">
<img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//6.png">
