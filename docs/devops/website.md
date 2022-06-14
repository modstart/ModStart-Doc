# 网站运维

## 如何为网站强制增加 www

Nginx 参考配置

```
server {
    listen 80;
    server_name modstart.com;
    location / {
        rewrite ^/(.*)$ http://www.modstart.com/$1 permanent;
    }
}
```

## 网站如何强制跳转为 https

Nginx 参考配置

```
server {
    listen 80;
    server_name www.modstart.com;
    location / {
        rewrite ^/(.*)$ https://www.modstart.com/$1 permanent;
    }
}
```


## 为网站开通CDN加速

通过CDN可以将动态请求、静态资源分离，加速网站的访问。我们推荐如下的CDN加速方式

![image-20220517205009684](https://ms-assets.modstart.com/data/image/2022/05/17/46211_p4pa_8208.png)

**CDN静态资源更新问题**

> 系统内置了静态资源自动计算Hash的问题来避免缓存，静态资源加载的路径格式为 `https://xxx.com/xxx.js?<Hash数字>`，当静态资源发生更新时，`Hash数字`会发生变化，从而让CDN加速节点感知资源的变化，拉取最新的静态资源。

> 部分CDN加速可能会忽略请求参数，在配置CDN加速服务时，请勿忽略请求的参数（即静态资源请求链接`?`后的`Hash数字`参数）


## 如何开启Redis作为缓存驱动

系统已经默认安装了 `predis/predis` 扩展，只需要以下简单配置即可完成缓存驱动切换。

```shell
## 切换缓存驱动为 redis
CACHE_DRIVER=redis

## 设置 Redis 连接信息
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=xxxxx
REDIS_PORT=6379
```

配置完成后清除系统缓存

> 更详细的配置参考 `config/cache.php` 和 `config/database.php` 文件


## 如何优化网站打开速度

### 1. 优化静态资源加载速度

网络传输会很大程度影响加载速度，服务器的带宽再大同时访问的人数增多带宽也会打满。
 
使用 CDN 优化静态资源加载速度，如七牛、网易、百度、阿里云等，具体方法可网上自行查找。

### 2. 优化后端服务响应速度

第一步，安装并开启 OPCache ，可以让网站加载速度提升。

> 修改 php.ini

```
[opcache]
opcache.enable=1
; 可用内存, 酌情而定, 单位为：Mb
opcache.memory_consumption=528
; Zend Optimizer + 暂存池中字符串的占内存总量.(单位:MB)
; opcache.interned_strings_buffer=8
; 对多缓存文件限制, 命中率不到 100% 的话, 可以试着提高这个值
opcache.max_accelerated_files=10000
; Opcache 会在一定时间内去检查文件的修改时间, 这里设置检查的时间周期, 默认为 2, 定位为秒
; 生产环境，代码不变可以关闭0
opcache.revalidate_freq=1
```

第二步，使用Laravel优化命令优化系统加载流程

```shell
## 缓存路由
php artisan route:cache
## 缓存配置
php artisan config:cache
## 类映射加载优化
php artisan optimize
```

> 对应的清空缓存

```shell
## 清除缓存路由
php artisan route:clear
## 清除缓存配置
php artisan config:clear
## 清除类映射加载优化
php artisan clear-compiled
```

> 我们强烈推荐使用 Linux 部署 PHP 服务，性能会比 Windows 提升不少。
