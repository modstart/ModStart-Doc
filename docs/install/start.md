# ModStart 安装说明

## 环境要求

### 操作系统

- Linux/Unix
- Windows

### 软件环境

- Laravel 5.1 的运行环境
- Apache/Nginx
- PHP 5.5.9+ 或 PHP 7.0
- MySQL 5.0+
- Redis（可选）

## 安装步骤

1. 配置 apache/nginx 服务器，请将网站的根目录配置到 <网站目录>/public；
2. 访问 http://yourdomain.com/install.php；
3. 使用安装引导向导进行安装；

<p>
<img src="https://mz-assets.tecmz.com/data/image/2020/04/21/47617_sqcj_4993.jpg" />
</p>

## 参考配置

### Nginx参考配置

```
server {
    listen       80;
    server_name  yourdomain.com;
    charset utf-8;
    index index.php index.html;
    root /path/to/yourdomain.com/public;
    autoindex off;

    location ^~ /.git {
        deny all;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass   127.0.0.1:9000;
        fastcgi_index  index.php;
        fastcgi_param  PHP_VALUE  "open_basedir=/path/to/yourdomain.com/:/tmp/:/var/tmp/";
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ \.(gif|jpg|jpeg|png|bmp|ico|css|js)$ {
       expires max;
    }

    location ~* \.(eot|ttf|woff|woff2)$ {
        add_header Access-Control-Allow-Origin '*';
    }

}
```

### Apache参考配置

```
<VirtualHost *:80>
　　ServerName www.yourdomain.com
　　DocumentRoot d:/wwwroot/www.yourdomain.com/public
</VirtualHost>
```