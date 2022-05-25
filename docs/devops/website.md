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
