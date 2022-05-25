# 系统运维


## 系统运行过程会产生的新数据

默认运行情况下，只会产生以下新数据：

- 数据库内容
- `/public/data/` 上传的文件数据（如果启用了云存储，文件是直接存储在云存储中，忽略本条）
- `/.env` 系统基本配置文件
- `/storage/install.lock` 系统安装锁定文件
- `/module/Xxx/` 新安装的模块代码



## 如何从一台服务器迁移到另一台服务器

1）复制整个网站目录到新的服务器

2）在新的服务器上配置系统，参照「安装入门」中的说明文档，保证访问可达

> 配置好新系统后，保证访问 http://example.com/install/ping 返回 ok 文本
>
> 如果有异常信息请参照[「使用常见问题」](/devops/basic.html)解决。

3）修改必要的配置信息 `/.env` 文件

4）清理系统缓存

```shell
php artisan cache:clear
php artisan view:clear
```

5）访问新的系统


## git常用命令


```shell
## git忽略文件权限变更
git config --add core.filemode false

## 清空git历史
git checkout --orphan temp_branch
git add -A
git commit -am "init"
git branch -D master
git branch -m master

## 修改最近一次提交信息
git commit --amend -m "New commit message."

## 存储用户名密码信息
git config --global credential.helper store

## 从HEAD往前打1个patch
git format-patch -1 HEAD

## 应用一个patch到当前分支，合并失败的文件生成 rej 文件
git apply --reject 0001-xxx.patch
```


## nginx常用配置

### 反向代理

```
server {
    server_name old.example;
    location / {
        proxy_pass http://xx.xx.xx.xx:8080;
        proxy_set_header Host $host;
    }
}
```
