# 使用PHPStudy搭建ModStartCMS

## 下载安装PHPStudy

<strong>访问以下地址进行下载（v8.1）</strong>

[https://www.xp.cn/download.html](https://www.xp.cn/download.html)

<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//11.png"></p>

<p><img style="max-width:50px;" src="https://mz-assets.tecmz.com/data//22.png"></p>

## PHPStudy环境配置

<p><strong>创建网站</strong></p>
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//1414.png"></p>

### PHP版本

php-5.6.9-nts
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//33.png"></p>

### PHP扩展

<p>安装<strong>OpenSSL</strong>扩展</p>
<p>安装<strong>FileInfo</strong>扩展</p>
<p>安装<strong>Exif</strong>扩展</p>
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//44.png"></p>

### 复制源码至根目录

<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//1010.png"></p>

### 配置网站根目录至.../public

<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//1212.png"></p>

### 配置伪静态

<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//1313.png"></p>

**Nginx伪静态参考配置**

```
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

**Apache伪静态参考配置**

> 不需要配置

### 增加数据库
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//88.png"></p>

### 设置防止警告参数
always_populate_raw_post_data
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//55.png"></p>
<p><strong>设置前</strong></p>
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//66.png"></p>
<p><strong>设置后</strong></p>
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//77.png"></p>

### 修改hosts
<p>打开hosts文件</p>
<p>在结尾新增一行解析 <code>127.0.0.1 localhost</code> 并保存退出</p>
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//99.png"></p>

### 进入安装引导
<p><strong>访问：</strong><code>http://localhost/install.php</code></p>
<p><img style="max-width:500px;" src="https://mz-assets.tecmz.com/data//1111.png"></p>

### 愉快的使用吧

在使用过程中，如果遇到什么问题请及时在社区 [https://modstart.com/forum](https://modstart.com/forum) 进行反馈。

同时，如果再使用过程中有更好的建议或者意见，也请直接在社区中提交意见反馈。
