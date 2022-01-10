# 常见问题

## Q：安装模块后系统报错打不开

- 第1步，删除安装的模块 `module/Xxx` 目录，尝试刷新页面打开，如果打不开请执行第2步
- 第2步，清除缓存（删除 `bootstrap/cache/` 和 `storage/framework/cache` 目录中的所有文件，注意不要删除目录本身），完成后重试

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
















