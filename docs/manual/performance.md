# 性能报告

## 压测环境

### 硬件环境

`MacBookPro M1` + `Docker`

### 软件环境



- `MySQL 5.7` （docker限制2核2G）
- `PHP 7.0`（docker限制4核4G）
- `Tengine`
- `Redis`



### 软件优化



- `php artisan config:cache`
- `php artisan optimize`
- `opcache` 开启
- `php-fpm` 配置  `pm = static` `pm.max_children = 100`
- `redis` 开启



### 请求地址


`ModStartCMS` 安装后的首页地址


## 性能报告

### 压测请求

初始 20 并发，每 30 秒加 20 并发，摸高到 100，随后每秒递减 5

![请求曲线](https://ms-assets.modstart.com/data/image/2022/01/13/53985_sp86_2569.jpg)

### 响应概况

总15877请求，100%响应成功，最小25ms，最大1941ms，平均628ms

![响应曲线](https://ms-assets.modstart.com/data/image/2022/01/13/53985_o8vc_4297.jpg)

### 响应曲线

![响应曲线](https://ms-assets.modstart.com/data/image/2022/01/13/53985_ubbx_9769.jpg)

## 说明

使用的是笔记本单台机器+Docker压测，压测结果仅供参考。