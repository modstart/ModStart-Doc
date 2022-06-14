# 使用常见问题

## Q：安装环境检查提示缺少 xxx 函数

编辑 `php.ini` 文件，找到 `disable_functions` 并将其中的 `xxx` 函数移除，然后重启服务器即可。

为什么要使用这些函数？

- `proc_open` : Laravel 执行 `artisan` 命令时需要用到
- `proc_get_status` : Laravel 执行 `artisan` 命令时需要用到
- `putenv` : Laravel 执行 `artisan` 命令时需要用到

## Q：安装模块后系统报错打不开

- 第1步，删除安装的模块 `module/Xxx` 目录，尝试刷新页面打开，如果打不开请执行第2步
- 第2步，清除缓存（删除 `bootstrap/cache/` 和 `storage/framework/cache/` 目录中的所有文件，注意不要删除目录本身），完成后重试

## Q：系统后台一键升级后系统报错

后台一键升级前请备份系统的完整文件和数据库，如果系统有自定义开发，升级不保证不会破坏系统原有数据。

如遇到报错打不开请按照如下步骤排查

- 第1步，打开调试日志（设置 .env 文件中 APP_DEBUG=true）
- 第2步，查看系统的错误信息，进行排查

## Q：Rewrite规则

在安装过程中，伪静态错误是经常会出现的问题，可以根据以下几种方式进行排错：

如果确信伪静态规则无误，可以通过访问 `http://你的域名/install/ping` 来访问，如果页面结果为OK则表示伪静态配置成功。

### 基础准备工作

基础工作的准备可以让你更快的定位错误

- 第一步，打开调试（配置 .env 文件中 APP_DEBUG=true），可以让错误显示在页面上，方便调试
- 第二步，配置服务器的网站根目录为 `/www/example.com/public` 或 `D:/wwwroot/example.com/public`，这一步很多人搞错，需要配置到 `/public` 目录

### Apache错误诊断

**第一步，检测Apache是否支持mod_rewrite**

在 Apache 的配置目录（通常为`apache/conf/httpd.conf`）中找到 `rewrite_module` 相关配置。

- 如果未开启（ 即 `#LoadModule rewrite_module` 前面有 `#` ），将前面的 `#` 号删除即可。
- 如果没有查找到，则到 `LoadModule` 区域，在最后一行加入 `LoadModule rewrite_module modules/mod_rewrite.so`。

完成以上操作后，重启Apache。

**第二步，让apache服务器支持.htaccess**

修改一下配置文件 `httpd.conf` ，用文本编辑器打开后，查找

```
Options FollowSymLinks
AllowOverride None
```

改为

```
Options FollowSymLinks
AllowOverride All
```

**第三步，检查网站的 `.htaccess` 文件是否正确**

部分软件配置时会覆盖 ModStart 默认的 `.htaccess` 文件，检查 `public/.htaccess` 文件是否为一下内容。

```
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    RewriteEngine On

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

## Q：忘记后台管理密码怎么办

系统中使用的是 md5 组合加密，如果忘记后台管理密码，请将表 `admin_user` 对应的用户记录密码信息重置为如下：

```
password: 3c20ecadec461ce77179008a44850334
passwordSalt: KUBg1mMi5I
```

对应的密码为：`123456`

## Q：500错误/请求出现错误

“500错误”或“请求出现错误”通常是程序处理发生错误。

需要查看 `storage/logs/` 目录下的日志文件，找到当天最新的日志文件（如 `laravel-2021-01-01.log`），查看报错原因并解决。

错误日志需要定位到最新的错误日志，完整的一条错误日志通常如下格式所示，将该错误日志寻求其他开发者帮助（注意隐藏日志中的敏感信息）。

```
[2022-01-10 10:28:15] product.ERROR: xxx
Stack trace:
#0 xxx
#1 xxx
#2 xxx
#3 xxx
#4 xxx
#5 xxx
#x xxx
```

如果是发生在测试或开发环境，为了快速定位，可按照如下步骤排查

- 第1步，打开调试日志（设置 .env 文件中 APP_DEBUG=true）
- 第2步，直接访问页面查看错误信息，进行排查

## Q：网站加载速度很慢

使用现代化浏览器（推荐 Chrome ），在页面右击，点击 `审查元素`，切换到 `Network` ，查看导致页面加载慢的请求。

- 如果是静态资源（ js, css 等文件 ）加载速度慢，需要考虑增加服务器带宽或者使用 CDN 等提高静态资源访问速度。
- 如果是服务器的接口请求慢，可能是由于服务器配置、数据库连接速度等原因导致，需要咨询专业技术人员进行分析处理。

![](https://ms-assets.modstart.com/data/image/2022/01/26/68498_dvjf_2408.jpg)

## Q：网站经过多层 Nginx 转发怎么配置

网站经过多层代理转发，通常在调用 `action` 方法生成 `URL` 时会出现异常。

这时可以通过在 .env 文件中设置如下两个配置来修正：

```
# 修正转发协议
FORCE_SCHEMA = http 或 https
# 修正用户访问URL
SUBDIR_URL = http://www.xxx.com
```

## Q：网站打不开，页面一直处于加载中

第一步，诊断是否为后端异常

参照 [500错误-请求出现错误](#q-500错误-请求出现错误) 找到后端报错日志。

第二步，诊断是否为前端异常

使用现代化浏览器（推荐 Chrome ），在页面右击，点击 `审查元素`，切换到 `Console` ，查看是否有任何报错。

## Q：迁移环境后出现访问500错误

出现类似如下错误

```
Failed opening required 'xxx/module/Vendor/Web/routes.php' **
Stack trace:
#0 {main}
```

系统在运行时为了提高性能会缓存部分文件路径，在新环境如果路径不一致会导致缓存文件加载失败。只需要清除缓存即可，步骤如下：

Tips：删除目录中的所有文件，注意不要删除目录本身，完成后重试

- 删除 `bootstrap/cache/` 中的所有文件
- 删除 `storage/framework/cache/` 中的所有文件


## Q：模块市场出现502请求错误

访问模块市场提示「请求出现错误」，同时接口 `后台/module_store/all` 返回502错误。

如果您的其他页面访问正常，通常还会看到 PHP-PMF 的错误日志

```
[error] 2874786#0: *8565 recv() failed (104: Connection reset by peer) 
while reading response header from upstream ***
```

出现该错误，可能的原因有：

**（1）TCP/IP问题**

主要现象是在服务器完成下载内容之前连接被关闭，可能是网络问题，有可能导致的因素

- 最大传输单元问题
- 防火墙问题
- 未知网络问题

**（2）内核Bug**

请注意，在v2.6.17之后的一些Linux内核上，TCP窗口扩展存在一些问题，更多参考

- [https://bugs.launchpad.net/ubuntu/+source/linux-source-2.6.17/+bug/59331](https://bugs.launchpad.net/ubuntu/+source/linux-source-2.6.17/+bug/59331)
- [https://bugs.launchpad.net/ubuntu/+source/linux-source-2.6.20/+bug/89160](https://bugs.launchpad.net/ubuntu/+source/linux-source-2.6.20/+bug/89160)

**（3）PHP 的 CURL 扩展 Bug**

这些Bug可能是

- [https://bugs.php.net/bug.php?id=52828](https://bugs.php.net/bug.php?id=52828)
- [https://bugs.php.net/bug.php?id=52827](https://bugs.php.net/bug.php?id=52827)
- [https://bugs.php.net/bug.php?id=52202](https://bugs.php.net/bug.php?id=52202)
- [https://bugs.php.net/bug.php?id=50410](https://bugs.php.net/bug.php?id=50410)

我们曾经排查过几个类似问题，最终无果。该问题的影响因素较多，遇到该问题后，我们建议您更换 PHP 版本。

## Q：忘记后台用户或密码怎么办？

为了安全起见，系统不支持后台用户密码的找回。如果忘记后台管理密码，只需要使用专业数据库工具修改后台用户表 `admin_user` 即可。

修改对应的用户 `password` 和 `passwordSalt` 字段。

- `password`: `3c20ecadec461ce77179008a44850334`
- `passwordSalt`: `KUBg1mMi5I`

对应的登录密码为：`123456`

SQL参考

```sql
UPDATE admin_user 
    SET password='3c20ecadec461ce77179008a44850334',passwordSalt='KUBg1mMi5I'
    WHERE username = '用户名';
```

## Q：忘记后台路径怎么办？

查看网站根目录中的 `.env` 文件，查看 `ADMIN_PATH` 变量。

```
# 表示后台路径为 http://www.example.com/admin_xxx/
ADMIN_PATH=/admin_xxx/
```

## Q：always\_populate\_raw\_post\_data 配置

找到 `php.ini` 文件，进行如下配置

> 配置前

![](https://mz-assets.tecmz.com/data//66.png)

> 配置后（取消注释，去掉分号）

![](https://mz-assets.tecmz.com/data//77.png)

> 配置完成后需重新 PHP 服务。

## Q：SSL certificate problem 错误

php在curl的时候报此错误：

```
cURL error 60: SSL certificate problem: unable to get local issuer certificate
 (see http://curl.haxx.se/libcurl/c/libcurl-errors.html)
```

解决办法：

1）从 https://curl.haxx.se/ca/cacert.pem 下载最新的cacert.pem

2）将以下行添加到php.ini（如果这是共享托管和您没有访问php.ini然后你可以添加到.user.ini在public_html）

```shell
curl.cainfo=cacert.pem路径
# 如 Windows 配置
curl.cainfo=c:\wwwroot\cacert.pem
# 如 Linux 配置
curl.cainfo=/etccacert.pem
```

## Q：如何关闭后台登录验证码

修改配置文件 `vendor/modstart/modstart/config/modstart.php`

```php
<?php
return [
    // ...
    'admin' => [
        // ...
        'login' => [
            // 默认开启，修改为 false 表示关闭
            'captcha' => true,
        ],
    ],
];
```

## Q：如何手动执行模块安装命令

模块安装、升级时都会自动执行 `modstart:module-install` 命令，如果出现安装升级模块后部分原因未执行迁移命令（或执行失败），请参考以下命令手动执行。

```shell
## 进入网站根目录
cd /wwwroot/xxx.com
## 手动执行模块安装命令，Xxx为模块标识
php artisan modstart:module-install Xxx
```
